from base64 import encode
from django.core.files import File
from Crypto.PublicKey import RSA
from Crypto import Random
from Crypto.Cipher import PKCS1_OAEP

def decrypt(message,userid):
    f = open('../images/privateKey'+userid+'.pem')
    private_key = RSA.importKey(f.read())
    rsa_public_key = PKCS1_OAEP.new(private_key)
    return str(rsa_public_key.decrypt(message),'utf-8')

def encrypt(message,userid):
    f = open('../images/publicKey'+userid+'.pem')
    public_key = RSA.importKey(f.read())
    rsa_public_key = PKCS1_OAEP.new(public_key)
    print(rsa_public_key.encrypt(str.encode(message)))
    return rsa_public_key.encrypt(str.encode(message))


message = "hi"
encrypted = encrypt(message,"1")
decrypted = decrypt(encrypted,"1")

print(decrypted)