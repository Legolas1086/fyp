var rsa = require('node-rsa')
var fs = require('fs')
var publickey = new rsa()
var privatekey = new rsa()
pub = fs.readFileSync('/home/clown/fyp/backend/images/publicKey2.pem')
pri = fs.readFileSync('/home/clown/fyp/backend/images/privateKey2.pem')
publickey.importKey(pub)
privatekey.importKey(pri)

en = publickey.encrypt("hello")
console.log(privatekey.decrypt(en,'utf-8'))