from __future__ import annotations
import math
from pathlib import Path
import sys
import unittest
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'code'))
from math_core import (compute_gae,finite_lambda_mixture,masked_softmax,
                       softmax_vjp,gaussian_velocity,gaussian_flow,integrate_flow)

class AttentionTests(unittest.TestCase):
    def test_normalized(self):self.assertAlmostEqual(sum(masked_softmax([1,2,3],[True]*3)),1)
    def test_mask_support(self):self.assertEqual(masked_softmax([1,100,3],[True,False,True])[1],0)
    def test_shift_invariance(self):
        p=masked_softmax([1,2,-3],[True]*3);q=masked_softmax([1001,1002,997],[True]*3)
        for a,b in zip(p,q):self.assertAlmostEqual(a,b)
    def test_large_logits(self):self.assertTrue(all(math.isfinite(x) for x in masked_softmax([1e5,1e5-1],[True,True])))
    def test_empty_support(self):
        with self.assertRaises(ValueError):masked_softmax([1,2],[False,False])
    def test_vjp_finite_difference(self):
        x=[.4,-1.2,2];g=[.6,-.9,1.4];h=1e-6
        analytic=softmax_vjp(masked_softmax(x,[True]*3),g)
        for i in range(3):
            plus=x.copy();minus=x.copy();plus[i]+=h;minus[i]-=h
            f=lambda v:sum(a*b for a,b in zip(masked_softmax(v,[True]*3),g))
            self.assertAlmostEqual(analytic[i],(f(plus)-f(minus))/(2*h),places=8)
    def test_masked_gradient_zero(self):self.assertEqual(softmax_vjp([.2,0,.8],[1,90,3])[1],0)
    def test_gradient_sum_zero(self):self.assertAlmostEqual(sum(softmax_vjp([.2,.3,.5],[2,-1,4])),0)
    def test_temperature_chain_rule(self):
        tau=.7;x=[.4,-.9,1.3];g=[1.2,-.4,.8];h=1e-6
        f=lambda v:sum(a*b for a,b in zip(masked_softmax([z/tau for z in v],[True]*3),g))
        d=[z/tau for z in softmax_vjp(masked_softmax([z/tau for z in x],[True]*3),g)]
        for k in range(3):
            hi=x.copy();lo=x.copy();hi[k]+=h;lo[k]-=h
            self.assertAlmostEqual(d[k],(f(hi)-f(lo))/(2*h),places=8)
    def test_unique_max_low_temperature_gradient(self):
        tau=.01;p=masked_softmax([0,1/tau],[True,True]);d=softmax_vjp(p,[3,-1])
        self.assertLess(max(abs(x/tau) for x in d),1e-35)
    def test_joint_permutation_invariance(self):
        scores=[.4,-1.2,2.1];values=[-1,3,5];mask=[True,False,True];perm=[2,0,1]
        weighted=lambda s,v,m:sum(a*b for a,b in zip(masked_softmax(s,m),v))
        self.assertAlmostEqual(weighted(scores,values,mask),weighted([scores[k] for k in perm],[values[k] for k in perm],[mask[k] for k in perm]))
    def test_values_only_permutation_changes_output(self):
        p=masked_softmax([0,math.log(3)],[True,True])
        self.assertAlmostEqual(sum(a*b for a,b in zip(p,[-1,3])),2)
        self.assertAlmostEqual(sum(a*b for a,b in zip(p,[3,-1])),0)
    def test_invalid_probability(self):
        with self.assertRaises(ValueError):softmax_vjp([.5,.6],[1,1])

class GaussianFlowTests(unittest.TestCase):
    def test_start(self):self.assertAlmostEqual(gaussian_flow(0,1.3),1.3)
    def test_endpoint(self):self.assertAlmostEqual(gaussian_flow(1,1.3,m0=-1,s0=2,m1=3,s1=4),7.6)
    def test_velocity_at_mean(self):self.assertAlmostEqual(gaussian_velocity(.3,.6),2)
    def test_analytic_flow_ode(self):
        for t in [.05,.3,.7,.95]:
            h=1e-6;x0=1.3
            derivative=(gaussian_flow(t+h,x0)-gaussian_flow(t-h,x0))/(2*h)
            self.assertAlmostEqual(derivative,gaussian_velocity(t,gaussian_flow(t,x0)),places=8)
    def test_same_endpoints_nonconstant_scale(self):self.assertAlmostEqual(gaussian_flow(.5,1,m1=0),math.sqrt(.5))
    def test_euler_converges(self):
        exact=gaussian_flow(1,1.3);e1=abs(integrate_flow(1.3,50)-exact);e2=abs(integrate_flow(1.3,100)-exact)
        self.assertGreater(e1/e2,1.8);self.assertLess(e1/e2,2.2)
    def test_midpoint_more_accurate(self):
        exact=gaussian_flow(1,1.3)
        self.assertLess(abs(integrate_flow(1.3,50,'midpoint')-exact),abs(integrate_flow(1.3,50)-exact))
    def test_uncorrelated_residual_is_not_conditionally_zero(self):
        x=[-1.,0.,1.];r=[v*v-2/3 for v in x]
        self.assertAlmostEqual(sum(r)/3,0)
        self.assertAlmostEqual(sum(a*b for a,b in zip(x,r))/3,0)
        self.assertTrue(all(abs(v)>0 for v in r))
    def test_invalid_standard_deviation(self):
        with self.assertRaises(ValueError):gaussian_velocity(.5,1,s0=0)
    def test_invalid_steps(self):
        with self.assertRaises(ValueError):integrate_flow(1,0)

if __name__=='__main__':unittest.main()
