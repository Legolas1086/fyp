from audioop import reverse
import profile
from re import L
from django.dispatch import receiver
from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from django.forms.models import model_to_dict
from sqlalchemy import false, null, true
from yaml import serialize
from .models import Books, Users, chatHistory
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .serializer import UserSerializer,BooksSerializer, chatHistorySerializer,getUsersChatSerializer
from rest_framework import status
from django.db.models import Q
from .recomendation import sendMail,recommend,getSimilarBooks
from django.core import serializers as core_serializers

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
        print(request.query_params['id'])
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
        print(user1,user2)
        lookups = (Q(sender=user1) & Q(receiver=user2)) | (Q(sender=user2) & Q(receiver=user1))
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
    def patch(self,request):
        print(request.data)
        object = Books.objects.get(isbn=request.data['isbn'])
        object.cost = request.data['newPrice']
        object.sold = request.data['sold']
        object.save()
        serializer = BooksSerializer(object)
        return Response(serializer.data)


class getUsersChat(APIView):
    def get(self,request):
        id = int(request.query_params['id'])
        all_users = Users.objects.all().only('id','username')
        parameter = Q(sender=id)|Q(receiver=id)
        chats = chatHistory.objects.filter(parameter).order_by('-timestamp')
        senders = []
        for i in chats:
            if id != int(i.sender.id):
                if not any(d['id'] == i.sender.id for d in senders):
                    senders.append({'id':i.sender.id,'username':i.sender.username})
            else:
                if not any(d['id'] == i.receiver.id for d in senders):
                    senders.append({'id':i.receiver.id,'username':i.receiver.username})
            
        print(senders)
        res = {}
        res['all_users']=all_users
        res['senders']=senders
        serialize = getUsersChatSerializer(senders,many=true)
        return Response(serialize.data)



class Profile(APIView):
    def get(self,request):
        profile = Users.objects.filter(id=request.query_params['id'])
        print(profile)
        serialize = UserSerializer(profile,many=true)
        return Response(serialize.data)


class similarBooks(APIView):
    def get(self,request):
        bookid = request.query_params['id']
        book = Books.objects.filter(isbn=bookid)
        similarBooks = getSimilarBooks(book[0],bookid)
        print(similarBooks)
        serialize = BooksSerializer(similarBooks,many=true)
        return Response(serialize.data)

class Profile(APIView):
    def get(self,request):
        profile = Users.objects.filter(id=request.query_params['id'])
        print(profile)
        serialize = UserSerializer(profile,many=true)
        return Response(serialize.data)

class Wishlist(APIView):
    def patch(self,request):
        user = Users.objects.get(id=request.data['id'])
        print(user)
        user.wishlist = user.wishlist+" "+request.data['bookid']
        user.save()
        serialize = UserSerializer(user)
        return Response(serialize.data)
    
    
        
class getWishlist(APIView):
    def get(self,request):
        user = Users.objects.get(id=request.query_params['id'])
        wishlist = user.wishlist.split(" ")
        wishlist.pop(0)
        print(wishlist)
        wishBooks = []
        if len(wishlist)>0:
            for i in wishlist:
                wishBooks.append(Books.objects.get(isbn = i))
        serialize = BooksSerializer(wishBooks,many=true)
        return Response(serialize.data)

        

