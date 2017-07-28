# encoding: utf-8
# module scipy.io.matlab.streams
# from /Library/Frameworks/Python.framework/Versions/3.5/lib/python3.5/site-packages/scipy/io/matlab/streams.cpython-35m-darwin.so
# by generator 1.145
# no doc

# imports
import builtins as __builtins__ # <module 'builtins' (built-in)>
import zlib as zlib # /Library/Frameworks/Python.framework/Versions/3.5/lib/python3.5/lib-dynload/zlib.cpython-35m-darwin.so
import sys as sys # <module 'sys' (built-in)>

# functions

def make_stream(*args, **kwargs): # real signature unknown
    """ Make stream of correct type for file-like `fobj` """
    pass

def _read_into(*args, **kwargs): # real signature unknown
    pass

def _read_string(*args, **kwargs): # real signature unknown
    pass

# classes

class GenericStream(object):
    # no doc
    def read(self, *args, **kwargs): # real signature unknown
        pass

    def seek(self, *args, **kwargs): # real signature unknown
        pass

    def tell(self, *args, **kwargs): # real signature unknown
        pass

    def __init__(self, *args, **kwargs): # real signature unknown
        pass

    @staticmethod # known case of __new__
    def __new__(*args, **kwargs): # real signature unknown
        """ Create and return a new object.  See help(type) for accurate signature. """
        pass

    __pyx_vtable__ = None # (!) real value is ''


class cStringStream(GenericStream):
    # no doc
    def seek(self, *args, **kwargs): # real signature unknown
        pass

    def __init__(self, *args, **kwargs): # real signature unknown
        pass

    @staticmethod # known case of __new__
    def __new__(*args, **kwargs): # real signature unknown
        """ Create and return a new object.  See help(type) for accurate signature. """
        pass

    __pyx_vtable__ = None # (!) real value is ''


class FileStream(GenericStream):
    # no doc
    def seek(self, *args, **kwargs): # real signature unknown
        pass

    def tell(self, *args, **kwargs): # real signature unknown
        pass

    def __del__(self, *args, **kwargs): # real signature unknown
        pass

    def __init__(self, *args, **kwargs): # real signature unknown
        pass

    @staticmethod # known case of __new__
    def __new__(*args, **kwargs): # real signature unknown
        """ Create and return a new object.  See help(type) for accurate signature. """
        pass

    __pyx_vtable__ = None # (!) real value is ''


class ZlibInputStream(GenericStream):
    """
    File-like object uncompressing bytes from a zlib compressed stream.
    
        Parameters
        ----------
        stream : file-like
            Stream to read compressed data from.
        max_length : int
            Maximum number of bytes to read from the stream.
    
        Notes
        -----
        Some matlab files contain zlib streams without valid Z_STREAM_END
        termination.  To get round this, we use the decompressobj object, that
        allows you to decode an incomplete stream.  See discussion at
        http://bugs.python.org/issue8672
    """
    def all_data_read(self, *args, **kwargs): # real signature unknown
        pass

    def read(self, *args, **kwargs): # real signature unknown
        pass

    def seek(self, *args, **kwargs): # real signature unknown
        pass

    def tell(self, *args, **kwargs): # real signature unknown
        pass

    def __init__(self, *args, **kwargs): # real signature unknown
        pass

    @staticmethod # known case of __new__
    def __new__(*args, **kwargs): # real signature unknown
        """ Create and return a new object.  See help(type) for accurate signature. """
        pass

    __pyx_vtable__ = None # (!) real value is ''


# variables with complex values

__loader__ = None # (!) real value is ''

__pyx_capi__ = {
    'make_stream': None, # (!) real value is ''
}

__spec__ = None # (!) real value is ''

__test__ = {}

