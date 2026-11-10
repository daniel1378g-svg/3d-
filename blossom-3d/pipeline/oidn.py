"""Intel Open Image Denoise through ctypes, using the library that ships inside the bpy wheel.
(The bundled build has no 'RTLightmap' weights, so the generic 'RT' filter is used in HDR mode.)"""
import ctypes, glob, os
import numpy as np

_lib = None


def _load():
    global _lib
    if _lib is None:
        import bpy
        base = os.path.join(os.path.dirname(bpy.utils.resource_path('LOCAL')), 'lib')
        path = sorted(glob.glob(os.path.join(base, 'libOpenImageDenoise.so*')))[0]
        L = ctypes.CDLL(path)
        L.oidnNewDevice.restype = ctypes.c_void_p; L.oidnNewDevice.argtypes = [ctypes.c_int]
        L.oidnCommitDevice.argtypes = [ctypes.c_void_p]
        L.oidnNewFilter.restype = ctypes.c_void_p; L.oidnNewFilter.argtypes = [ctypes.c_void_p, ctypes.c_char_p]
        L.oidnSetSharedFilterImage.argtypes = [ctypes.c_void_p, ctypes.c_char_p, ctypes.c_void_p, ctypes.c_int] + [ctypes.c_size_t] * 5
        L.oidnSetFilterBool.argtypes = [ctypes.c_void_p, ctypes.c_char_p, ctypes.c_bool]
        L.oidnCommitFilter.argtypes = [ctypes.c_void_p]; L.oidnExecuteFilter.argtypes = [ctypes.c_void_p]
        L.oidnGetDeviceError.restype = ctypes.c_int; L.oidnGetDeviceError.argtypes = [ctypes.c_void_p, ctypes.POINTER(ctypes.c_char_p)]
        L.oidnReleaseFilter.argtypes = [ctypes.c_void_p]; L.oidnReleaseDevice.argtypes = [ctypes.c_void_p]
        _lib = L
    return _lib


def denoise(img, kind='RT'):
    """img: float32 (h, w, 3) linear HDR -> denoised copy."""
    L = _load()
    src = np.ascontiguousarray(img, np.float32); dst = np.empty_like(src)
    h, w, _ = src.shape
    dev = L.oidnNewDevice(1)            # CPU
    L.oidnCommitDevice(dev)
    f = L.oidnNewFilter(dev, kind.encode())
    L.oidnSetSharedFilterImage(f, b'color', src.ctypes.data, 3, w, h, 0, 0, 0)
    L.oidnSetSharedFilterImage(f, b'output', dst.ctypes.data, 3, w, h, 0, 0, 0)
    if kind == 'RT': L.oidnSetFilterBool(f, b'hdr', True)
    L.oidnCommitFilter(f); L.oidnExecuteFilter(f)
    msg = ctypes.c_char_p()
    err = L.oidnGetDeviceError(dev, ctypes.byref(msg))
    L.oidnReleaseFilter(f); L.oidnReleaseDevice(dev)
    if err: raise RuntimeError('OIDN: %s' % (msg.value.decode('utf8', 'replace') if msg.value else err))
    return dst
