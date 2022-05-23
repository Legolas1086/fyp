import email
from email.policy import default
from unicodedata import category
from django.db import models
from sqlalchemy import false, true

# Create your models here.

def upload_to(instance,filename):
    return 'images/{filename}'.format(filename=filename)

class Users(models.Model):
    id = models.CharField(primary_key=true, unique=true,max_length=10)
    username = models.CharField(unique=True,null=false,max_length=20)
    email = models.EmailField(unique=True,null=false)
    password = models.CharField(max_length=20)
    branch = models.CharField(max_length=20)
    interests = models.CharField(max_length=150)


class Books(models.Model):
    isbn = models.CharField(primary_key=true,unique=true,max_length=10)
    bookname = models.CharField(max_length=50)
    author = models.CharField(max_length=50,default="Unknown")
    category = models.CharField(max_length=30)
    publisher = models.CharField(max_length=30)
    description = models.CharField(max_length=150)
    cost = models.IntegerField()
    image = models.ImageField(upload_to)
    sellerid = models.CharField(max_length=10,default="0000000001")