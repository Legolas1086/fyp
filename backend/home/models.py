import email
from email.policy import default
from unicodedata import category
from django.db import models
from pandas import notnull
from sqlalchemy import false, true

# Create your models here.

def upload_to(instance,filename):
    return 'images/{filename}'.format(filename=filename)

class Users(models.Model):
    id = models.AutoField(primary_key=true,unique=true)
    username = models.CharField(unique=True,null=false,max_length=20)
    email = models.EmailField(unique=True,null=false)
    password = models.CharField(max_length=20)
    branch = models.CharField(max_length=20)
    interests = models.CharField(max_length=150)


class Books(models.Model):
    isbn = models.AutoField(primary_key=true,unique=true)
    bookname = models.CharField(max_length=50,null=false,default="My book")
    author = models.CharField(max_length=50,default="Unknown")
    category = models.CharField(max_length=30,default="Unknown")
    publisher = models.CharField(max_length=30,default="Unknown")
    description = models.CharField(max_length=150,default="Unknown")
    cost = models.IntegerField(default=0)
    image = models.ImageField(upload_to)
    sellerid = models.ForeignKey(Users,on_delete=models.CASCADE,default="1")