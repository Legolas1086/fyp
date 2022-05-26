from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from sqlalchemy import true
from yaml import serialize
from .models import Books, Users
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import UserSerializer,BooksSerializer


class FetchUser(APIView):
    def get(self,request):
        user = Users.objects.all()
        serialize = UserSerializer(user,many=true)
        return Response(serialize.data)

class FetchBooks(APIView):
    def get(self,request):
        books = Books.objects.all()
        serialize = BooksSerializer(books,many=true)
        return Response(serialize.data)

class FetchBookDetails(APIView):
    def get(self,request):
        print(request.query_params)
        input_isbn=request.query_params['id']
        books = Books.objects.filter(isbn=input_isbn)
        serialize = BooksSerializer(books,many=true)
        return Response(serialize.data)