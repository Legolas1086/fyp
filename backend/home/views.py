from re import L
from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from django.forms.models import model_to_dict
from sqlalchemy import false, null, true
from yaml import serialize
from .models import Books, Users, chatHistory
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .serializer import UserSerializer,BooksSerializer, chatHistorySerializer
from rest_framework import status
from django.db.models import Q
from .recomendation import sendMail,recommend

class RegisterUser(APIView):
    parser_classes = (MultiPartParser, FormParser)


    def post(self, request, *args, **kwargs):
        posts_serializer = UserSerializer(data=request.data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Authenticate(APIView):
    def get(self,request):
        print(request.query_params)
        input_password = request.query_params['pass']
        input_email = request.query_params['email']
        user = Users.objects.filter(email=input_email)
        if user[0].password == input_password:
            return Response(user[0].id)
        else:
            return Response(null)      



class FetchUser(APIView):
    def get(self,request):
        user = Users.objects.all()
        serialize = UserSerializer(user,many=true)
        return Response(serialize.data)

class FetchBooks(APIView):
    def get(self,request):
        userid = request.query_params['id']
        books = Books.objects.all()
        sorted_books = recommend(books,userid)
        serialize = BooksSerializer(sorted_books,many=true)
        return Response(serialize.data)

class FetchBookDetails(APIView):
    def get(self,request):
        print(request.query_params)
        input_isbn=request.query_params['id']
        books = Books.objects.filter(isbn=input_isbn)
        serialize = BooksSerializer(books,many=true)
        return Response(serialize.data)

class FetchSimilarBook(APIView):
    def get(self,request):
        books= Books.objects.all()
        serialize = BooksSerializer(books,many=true)
        return Response(serialize.data)
    pass

class PostBook(APIView):
    parser_classes = (MultiPartParser, FormParser)


    def post(self, request, *args, **kwargs):
        posts_serializer = BooksSerializer(data=request.data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            sendMail(posts_serializer.data)
            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MyBooks(APIView):
    def get(self,request):
        owner = request.query_params['sellerid']
        books = Books.objects.filter(sellerid=owner)
        serialize = BooksSerializer(books,many=true)
        return Response(serialize.data)

class displayChat(APIView):
    def get(self,request):
        user1 = request.query_params['user1']
        user2 = request.query_params['user2']
        lookups = (Q(sender=user1) and Q(receiver=user2)) | (Q(receiver=user1) and Q(sender=user2))
        chats = chatHistory.objects.filter(lookups).order_by('timestamp')
        serialize = chatHistorySerializer(chats,many = true)
        return Response(serialize.data)

class postChat(APIView):
    parser_classes = (MultiPartParser, FormParser)


    def post(self, request, *args, **kwargs):
        chats_serializer = chatHistorySerializer(data=request.data)
        if chats_serializer.is_valid():
            chats_serializer.save()
            return Response(chats_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', chats_serializer.errors)
            return Response(chats_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SearchBook(APIView):
    def get(self,request):
        userid = request.query_params['id']
        search_query = request.query_params['search']
        object = Users.objects.get(id=userid)
        object.searchHistory = object.searchHistory+" "+search_query
        object.save()
        filter = Q(bookname__icontains=search_query) | Q(author__icontains=search_query) | Q(category__icontains=search_query) | Q(description__icontains=search_query) | Q(category__icontains=search_query)
        books = Books.objects.filter(filter)
        serialize = BooksSerializer(books,many=true)
        return Response(serialize.data)

class EditBook(APIView):
    def post(self,request):
        print(request.POST)
        #sold = request.POST.get['sold']
        #isbn = request.POST.get['isbn']
        #object = Books.objects.get(isbn=isbn)
        #object.price = price
        #object.sold = sold
