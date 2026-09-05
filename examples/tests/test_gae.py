from __future__ import annotations
import math
from pathlib import Path
import sys
import unittest
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'code'))
from math_core import (compute_gae,finite_lambda_mixture,masked_softmax,
                       softmax_vjp,gaussian_velocity,gaussian_flow,integrate_flow)

class GAETests(unittest.TestCase):
    def assertVector(self,a,b):
        self.assertEqual(len(a),len(b))
        for x,y in zip(a,b):self.assertAlmostEqual(x,y,places=10)
    def example(self,lam=.8,trunc=False):
        return compute_gae([1,2,3],[.5,.4,.2],[.4,.2,5 if trunc else 0],
                           [False,False,not trunc],[False,False,trunc],.9,lam)
    def test_terminated_example(self):self.assertVector(self.example()[0],[3.59312,3.796,2.8])
    def test_value_targets(self):self.assertVector(self.example()[1],[4.09312,4.196,3])
    def test_truncated_example(self):self.assertVector(self.example(trunc=True)[0],[5.92592,7.036,7.3])
    def test_lambda_zero(self):self.assertVector(self.example(lam=0)[0],[.86,1.78,2.8])
    def test_lambda_one(self):self.assertAlmostEqual(self.example(lam=1)[0][0],4.73)
    def test_gamma_zero(self):
        a,_=compute_gae([1,2],[.5,.4],[.4,9],[False,False],[False,False],0,.8)
        self.assertVector(a,[.5,1.6])
    def test_single_transition(self):
        a,_=compute_gae([2],[1],[5],[False],[True],.9,1)
        self.assertVector(a,[5.5])
    def test_no_reset_leakage(self):
        a,_=compute_gae([0,100],[2,0],[5,0],[False,True],[True,False],.9,1)
        self.assertVector(a,[2.5,100])
    def test_independent_mixture(self):
        rewards=[.3,-1,2,.8];values=[.2,.4,-.5,.7,1.2]
        for lam in [0,.3,.8,1]:
            with self.subTest(lam=lam):
                a,_=compute_gae(rewards,values[:-1],values[1:],[False]*4,[False]*4,.93,lam)
                self.assertAlmostEqual(a[0],finite_lambda_mixture(rewards,values,.93,lam),places=12)
    def test_mixture_single_lambda_zero(self):self.assertAlmostEqual(finite_lambda_mixture([1],[.5,2],.9,0),2.3)
    def test_propagated_value_error(self):
        for lam in [0,.5,1]:
            a,_=compute_gae([0,0,0],[0,0,0],[0,0,5],[False]*3,[False,False,True],.9,lam)
            b,_=compute_gae([0,0,0],[0,0,0],[0,0,1],[False]*3,[False,False,True],.9,lam)
            self.assertAlmostEqual(b[0]-a[0],.9*(.9*lam)**2*(-4))
    def test_invalid_lengths(self):
        with self.assertRaises(ValueError):compute_gae([1],[],[0],[True],[False],.9,.8)
    def test_invalid_bool(self):
        with self.assertRaises(ValueError):compute_gae([1],[0],[0],[1],[False],.9,.8)
    def test_nonfinite(self):
        with self.assertRaises(ValueError):compute_gae([float('nan')],[0],[0],[True],[False],.9,.8)


if __name__=="__main__":unittest.main()
