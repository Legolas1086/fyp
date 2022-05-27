from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from sqlalchemy import true
from yaml import serialize
from .models import Books, Users
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .serializer import UserSerializer,BooksSerializer
from rest_framework import status


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

class PostBook(APIView):
    parser_classes = (MultiPartParser, FormParser)


    def post(self, request, *args, **kwargs):
        posts_serializer = BooksSerializer(data=request.data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)