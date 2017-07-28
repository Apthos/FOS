# encoding: utf-8
# module scipy.io.matlab.mio_utils
# from /Library/Frameworks/Python.framework/Versions/3.5/lib/python3.5/site-packages/scipy/io/matlab/mio_utils.cpython-35m-darwin.so
# by generator 1.145
""" Utilities for generic processing of return arrays from read """

# imports
import builtins as __builtins__ # <module 'builtins' (built-in)>
import numpy as np # /Library/Frameworks/Python.framework/Versions/3.5/lib/python3.5/site-packages/numpy/__init__.py

# functions

def chars_to_strings(*args, **kwargs): # real signature unknown
    """
    Convert final axis of char array to strings
    
        Parameters
        ----------
        in_arr : array
           dtype of 'U1'
    
        Returns
        -------
        str_arr : array
           dtype of 'UN' where N is the length of the last dimension of
           ``arr``
    """
    pass

def squeeze_element(*args, **kwargs): # real signature unknown
    """
    Return squeezed element
    
        The returned object may not be an ndarray - for example if we do
        ``arr.item`` to return a ``mat_struct`` object from a struct array
    """
    pass

# no classes
# variables with complex values

__loader__ = None # (!) real value is ''

__pyx_capi__ = {
    'chars_to_strings': None, # (!) real value is ''
    'squeeze_element': None, # (!) real value is ''
}

__spec__ = None # (!) real value is ''

__test__ = {}

