from base64 import encode
from django.core.files import File
from Crypto.PublicKey import RSA
from Crypto import Random
from Crypto.Cipher import PKCS1_OAEP
import os
import codecs
import base64


from yaml import serialize
from .models import Keys
from .serializer import keysSerializer

def generateKeys(userid):
    key = RSA.generate(2048)
    publicKey = open('./publickkeys/publicKey'+str(userid)+'.pem', 'wb')
    publicKey.write(key.publickey().exportKey('PEM'))
    publicKey.close()
    privateKey = open('./privatekeys/privateKey'+str(userid)+'.pem', 'wb')
    privateKey.write(key.exportKey('PEM'))
    privateKey.close()
    f1 = open('./publicKey'+str(userid)+'.pem','rb')
    f2 = open('./privateKey'+str(userid)+'.pem','rb')
    pubkey = File(f1)
    prikey = File(f2)

    data = {'userid':userid,'publicKey':pubkey,'privateKey':prikey}
    serializer = keysSerializer(data=data)
    print
    if serializer.is_valid():
        print("///////saving//////////")
        serializer.save()
    else:
        print(serializer.errors)


def decrypt(message,userid):
    print(message)
    f = open('./images/privateKey'+userid+'.pem')
    private_key = RSA.importKey(f.read())
    rsa_public_key = PKCS1_OAEP.new(private_key)
    return rsa_public_key.decrypt(message)

def encrypt(message,userid):
    f = open("./images/publicKey"+userid+".pem")
    public_key = RSA.importKey(f.read())
    rsa_public_key = PKCS1_OAEP.new(public_key)
    print(rsa_public_key.encrypt(str.encode(message)))
    return rsa_public_key.encrypt(str.encode(message))