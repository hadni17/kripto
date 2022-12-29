from .ecc import AppECC
from .rsa import AppRSA
from .old_ntru import AppNTRU
from .types_1 import PublicKey, PrivateKey


SUPPORTED_ALGORITHMS = [
    "ecc",
    "ntru",
]

ALGORITHM_CLASS = {
    "ecc": AppECC,
    "ntru": AppNTRU,

}


def is_supported(alg: str) -> bool:
    return alg in SUPPORTED_ALGORITHMS


def get_keys(alg: str) -> (PublicKey, PrivateKey):
    return ALGORITHM_CLASS[alg].generate_keys()


def encrypt(alg: str, message: str, pb: PublicKey) -> str:
    return ALGORITHM_CLASS[alg].encrypt(message, pb)


def decrypt(alg: str, message: str, pv: PrivateKey) -> str:
    return ALGORITHM_CLASS[alg].decrypt(message, pv)
