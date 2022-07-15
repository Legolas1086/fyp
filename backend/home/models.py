import email
from email.policy import default
from unicodedata import category
from django.db import models
from pandas import notnull
from sqlalchemy import false, true



# Create your models here.
def publicKeyFile(instance,filename):
    return 'publickeys/{filemame}'.formant(filename=filename)

def privateKeyFile(instance,filename):
    return 'privatekeys/{filename}'.format(filename=filename)

def upload_to(instance,filename):
    return 'images/{filename}'.format(filename=filename)

class Users(models.Model):
    id = models.AutoField(primary_key=true,unique=true)
    username = models.CharField(unique=True,null=false,max_length=20)
    email = models.EmailField(unique=True,null=false)
    password = models.CharField(max_length=20)
    branch = models.CharField(max_length=20)
    interests = models.CharField(max_length=150)
    searchHistory = models.CharField(default=" ",max_length=100000)
    wishlist = models.CharField(default="",max_length=1000000)

class Keys(models.Model):
    id = models.AutoField(primary_key=True,unique=true)
    userid = models.ForeignKey(Users,related_name='keysid',on_delete=models.CASCADE)
    publicKey = models.FileField(publicKeyFile,null=true)
    privateKey = models.FileField(privateKeyFile,null=true)


class Books(models.Model):
    isbn = models.CharField(primary_key=true,unique=true,max_length=13)
    bookname = models.CharField(max_length=500,null=false,default="My book")
    author = models.CharField(max_length=500,default="Unknown")
    category = models.CharField(max_length=500,default="Unknown")
    publisher = models.CharField(max_length=500,default="Unknown")
    description = models.CharField(max_length=1550,default="Unknown")
    cost = models.IntegerField(default=0)
    image = models.ImageField(upload_to)
    sellerid = models.ForeignKey(Users,on_delete=models.CASCADE,default="1")
    sold = models.BooleanField(default=False)


class chatHistory(models.Model):
    chatid = models.AutoField(primary_key=true,unique=true)
    sender = models.ForeignKey(Users,related_name='chatSender',on_delete=models.CASCADE)
    receiver = models.ForeignKey(Users,related_name='chatReceiver',on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=true)
    message = models.BLOBField(null=false)
    messageReceiver = models.BinaryField(null=false)