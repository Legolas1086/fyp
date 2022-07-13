from django.core.files import File
from Crypto.PublicKey import RSA
from Crypto import Random
from Crypto.Cipher import PKCS1_OAEP
import os

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

