import email
from unicodedata import category
from django.db import models
from sqlalchemy import false, true

# Create your models here.


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
    category = models.CharField(max_length=30)
    publisher = models.CharField(max_length=30)
    description = models.CharField(max_length=150)
    cost = models.IntegerField()
    image = models.ImageField()