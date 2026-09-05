"""Small, explicit CPU reference functions for the workflow's teaching fixtures.

These functions operate on Python floats/lists. They do not exercise autograd,
GPU training, or any full RL/VLM training pipeline.
"""
from __future__ import annotations
import math
from collections.abc import Sequence


def _finite(values: Sequence[float], label: str) -> None:
    if not all(math.isfinite(float(x)) for x in values):
        raise ValueError(label + ' must contain finite values')


def compute_gae(rewards: Sequence[float], values: Sequence[float],
                next_values: Sequence[float], terminated: Sequence[bool],
                truncated: Sequence[bool], gamma: float, lam: float) -> tuple[list[float], list[float]]:
    """One-dimensional buffer. next_values[t] refers to the true final observation.

    All input sequences have length T>0. Bootstrapping is masked by terminated;
    recursion across a reset is masked by terminated OR truncated. The buffer
    boundary has zero residual tail. Values here are already detached scalars.
    """
    tmax = len(rewards)
    if tmax == 0 or any(len(a) != tmax for a in (values, next_values, terminated, truncated)):
        raise ValueError('all arrays must have the same positive length')
    if not 0 <= gamma <= 1 or not 0 <= lam <= 1:
        raise ValueError('gamma and lambda must be in [0,1]')
    if not all(type(x) is bool for x in [*terminated, *truncated]):
        raise ValueError('boundary flags must be bool')
    for a in (rewards,values,next_values): _finite(a,'numeric inputs')
    advantages=[0.0]*tmax;tail=0.0
    for t in range(tmax-1,-1,-1):
        bootstrap=0.0 if terminated[t] else float(next_values[t])
        delta=float(rewards[t])+gamma*bootstrap-float(values[t])
        continuation=0.0 if terminated[t] or truncated[t] else 1.0
        tail=delta+gamma*lam*continuation*tail
        advantages[t]=tail
    return advantages,[a+float(v) for a,v in zip(advantages,values)]


def finite_lambda_mixture(rewards: Sequence[float], values: Sequence[float], gamma: float, lam: float) -> float:
    """Independent finite mixture formula for the first state of one segment."""
    m=len(rewards)
    if m==0 or len(values)!=m+1: raise ValueError('values must contain m+1 entries')
    if not 0<=gamma<=1 or not 0<=lam<=1: raise ValueError('gamma/lambda outside [0,1]')
    _finite(rewards,'rewards');_finite(values,'values')
    targets=[]
    for n in range(1,m+1):
        target=sum((gamma**j)*float(rewards[j]) for j in range(n))+gamma**n*float(values[n])-float(values[0])
        targets.append(target)
    return sum((1-lam)*lam**(n-1)*targets[n-1] for n in range(1,m))+lam**(m-1)*targets[-1]


def masked_softmax(scores: Sequence[float], allowed: Sequence[bool]) -> list[float]:
    """Finite logits; at least one allowed position. Output support is exact."""
    if len(scores)==0 or len(scores)!=len(allowed): raise ValueError('positive matching lengths required')
    if not all(type(b) is bool for b in allowed):raise ValueError('mask must be boolean')
    if not any(allowed):raise ValueError('softmax is undefined on empty support in this interface')
    _finite(scores,'scores')
    offset=max(s for s,a in zip(scores,allowed) if a)
    exps=[math.exp(s-offset) if a else 0.0 for s,a in zip(scores,allowed)]
    norm=sum(exps)
    return [x/norm for x in exps]


def softmax_vjp(probabilities: Sequence[float], upstream: Sequence[float]) -> list[float]:
    """Vector-Jacobian product dL/dlogits for already-normalized probabilities."""
    if not probabilities or len(probabilities)!=len(upstream):raise ValueError('matching nonempty vectors required')
    _finite(probabilities,'probabilities');_finite(upstream,'upstream')
    if any(p<0 for p in probabilities) or not math.isclose(sum(probabilities),1.0,abs_tol=1e-10):
        raise ValueError('probabilities must be normalized and nonnegative')
    mean=sum(p*g for p,g in zip(probabilities,upstream))
    return [p*(g-mean) for p,g in zip(probabilities,upstream)]


def _gaussian_args(t:float,x:float,m0:float,s0:float,m1:float,s1:float)->None:
    _finite([t,x,m0,s0,m1,s1],'parameters')
    if not 0<=t<=1 or s0<=0 or s1<=0:raise ValueError('t in [0,1], standard deviations positive')


def gaussian_velocity(t:float,x:float,m0:float=0.0,s0:float=1.0,m1:float=2.0,s1:float=1.0)->float:
    _gaussian_args(t,x,m0,s0,m1,s1)
    mean=(1-t)*m0+t*m1
    variance=(1-t)**2*s0*s0+t*t*s1*s1
    covariance=-(1-t)*s0*s0+t*s1*s1
    return (m1-m0)+covariance*(x-mean)/variance


def gaussian_flow(t:float,x0:float,m0:float=0.0,s0:float=1.0,m1:float=2.0,s1:float=1.0)->float:
    _gaussian_args(t,x0,m0,s0,m1,s1)
    mean=(1-t)*m0+t*m1
    scale=math.sqrt((1-t)**2*s0*s0+t*t*s1*s1)
    return mean+scale/s0*(x0-m0)


def integrate_flow(x0:float,steps:int,method:str='euler',**parameters:float)->float:
    if type(steps) is not int or steps<1:raise ValueError('steps must be a positive integer')
    if method not in {'euler','midpoint'}:raise ValueError('unknown integration method')
    x=float(x0);h=1.0/steps
    for n in range(steps):
        t=n*h;v=gaussian_velocity(t,x,**parameters)
        if method=='euler':x+=h*v
        else:x+=h*gaussian_velocity(t+h/2,x+h*v/2,**parameters)
    return x
