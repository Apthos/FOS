# encoding: utf-8
# module scipy._lib._ccallback_c
# from /Library/Frameworks/Python.framework/Versions/3.5/lib/python3.5/site-packages/scipy/_lib/_ccallback_c.cpython-35m-darwin.so
# by generator 1.145
# no doc

# imports
import ctypes as ctypes # /Library/Frameworks/Python.framework/Versions/3.5/lib/python3.5/ctypes/__init__.py
import builtins as __builtins__ # <module 'builtins' (built-in)>
import _ctypes as ___ctypes


# Variables with simple values

idx = 1

# functions

def check_capsule(item): # real signature unknown; restored from __doc__
    """
    check_capsule(item)
    
        Return True if the given object is a PyCapsule.
    """
    pass

def get_capsule_signature(*args, **kwargs): # real signature unknown
    pass

def get_raw_capsule(ptr, name, context): # real signature unknown; restored from __doc__
    """
    get_raw_capsule(ptr, name, context)
    
        Create a new PyCapsule with given pointer, name, and context.
    
        Parameters
        ----------
        ptr : {PyCapsule, int}
            Memory address of the pointer.
        name : str
            Python string containing the signature.
        context : {PyCapsule, int}
            Memory address of the context.
            If NULL and ptr is a PyCapsule, use the one from the context of ptr.
    """
    pass

def plus1bc_ctypes(*args, **kwargs): # real signature unknown
    pass

def plus1b_ctypes(*args, **kwargs): # real signature unknown
    pass

def plus1_ctypes(*args, **kwargs): # real signature unknown
    pass

def sine_ctypes(*args, **kwargs): # real signature unknown
    pass

def test_call_cython(*args, **kwargs): # real signature unknown
    """ Implementation of a caller routine in Cython """
    pass

# classes

class plus1bc_t(___ctypes.PyCFuncPtr):
    # no doc
    def __init__(self, *args, **kwargs): # real signature unknown
        pass

    __weakref__ = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default
    """list of weak references to the object (if defined)"""


    _argtypes_ = (
        ctypes.c_double,
        '<value is a self-reference, replaced by this string>',
        '<value is a self-reference, replaced by this string>',
        None, # (!) real value is ''
        ctypes.c_void_p,
    )
    _flags_ = 1
    _restype_ = ctypes.c_double
    __dict__ = None # (!) real value is ''


class plus1b_t(___ctypes.PyCFuncPtr):
    # no doc
    def __init__(self, *args, **kwargs): # real signature unknown
        pass

    __weakref__ = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default
    """list of weak references to the object (if defined)"""


    _argtypes_ = (
        ctypes.c_double,
        '<value is a self-reference, replaced by this string>',
        None, # (!) real value is ''
        ctypes.c_void_p,
    )
    _flags_ = 1
    _restype_ = ctypes.c_double
    __dict__ = None # (!) real value is ''


class plus1_t(___ctypes.PyCFuncPtr):
    # no doc
    def __init__(self, *args, **kwargs): # real signature unknown
        pass

    __weakref__ = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default
    """list of weak references to the object (if defined)"""


    _argtypes_ = (
        ctypes.c_double,
        None, # (!) real value is ''
        ctypes.c_void_p,
    )
    _flags_ = 1
    _restype_ = ctypes.c_double
    __dict__ = None # (!) real value is ''


class sine_t(___ctypes.PyCFuncPtr):
    # no doc
    def __init__(self, *args, **kwargs): # real signature unknown
        pass

    __weakref__ = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default
    """list of weak references to the object (if defined)"""


    _argtypes_ = (
        ctypes.c_double,
        ctypes.c_void_p,
    )
    _flags_ = 1
    _restype_ = ctypes.c_double
    __dict__ = None # (!) real value is ''


# variables with complex values

sig = (
    b'double (double, double, int *, void *)',
    1,
)

sigs = [
    (
        b'double (double, int *, void *)',
        0,
    ),
    (
        b'double (double, double, int *, void *)',
        1,
    ),
]

__loader__ = None # (!) real value is ''

__pyx_capi__ = {
    'plus1_cython': None, # (!) real value is ''
    'plus1b_cython': None, # (!) real value is ''
    'plus1bc_cython': None, # (!) real value is ''
    'sine': None, # (!) real value is ''
}

__spec__ = None # (!) real value is ''

__test__ = {}
