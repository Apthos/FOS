# encoding: utf-8
# module scipy.stats.mvn
# from /Library/Frameworks/Python.framework/Versions/3.5/lib/python3.5/site-packages/scipy/stats/mvn.cpython-35m-darwin.so
# by generator 1.145
"""
This module 'mvn' is auto-generated with f2py (version:2).
Functions:
  value,inform = mvnun(lower,upper,means,covar,maxpts=d*1000,abseps=1e-06,releps=1e-06)
  error,value,inform = mvndst(lower,upper,infin,correl,maxpts=2000,abseps=1e-06,releps=1e-06)
COMMON blocks:
  /dkblck/ ivls
.
"""
# no imports

# Variables with simple values

__version__ = b'$Revision: $'

# functions

def dkblck(*args, **kwargs): # real signature unknown
    """ 'i'-scalar """
    pass

def mvndst(lower, upper, infin, correl, maxpts=None, abseps=None, releps=None): # real signature unknown; restored from __doc__
    """
    error,value,inform = mvndst(lower,upper,infin,correl,[maxpts,abseps,releps])
    
    Wrapper for ``mvndst``.
    
    Parameters
    ----------
    lower : input rank-1 array('d') with bounds (n)
    upper : input rank-1 array('d') with bounds (n)
    infin : input rank-1 array('i') with bounds (n)
    correl : input rank-1 array('d') with bounds (n*(n-1)/2)
    
    Other Parameters
    ----------------
    maxpts : input int, optional
        Default: 2000
    abseps : input float, optional
        Default: 1e-06
    releps : input float, optional
        Default: 1e-06
    
    Returns
    -------
    error : float
    value : float
    inform : int
    """
    pass

def mvnun(lower, upper, means, covar, maxpts=None, abseps=None, releps=None): # real signature unknown; restored from __doc__
    """
    value,inform = mvnun(lower,upper,means,covar,[maxpts,abseps,releps])
    
    Wrapper for ``mvnun``.
    
    Parameters
    ----------
    lower : input rank-1 array('d') with bounds (d)
    upper : input rank-1 array('d') with bounds (d)
    means : input rank-2 array('d') with bounds (d,n)
    covar : input rank-2 array('d') with bounds (d,d)
    
    Other Parameters
    ----------------
    maxpts : input int, optional
        Default: d*1000
    abseps : input float, optional
        Default: 1e-06
    releps : input float, optional
        Default: 1e-06
    
    Returns
    -------
    value : float
    inform : int
    """
    pass

# no classes
# variables with complex values

__loader__ = None # (!) real value is ''

__spec__ = None # (!) real value is ''

