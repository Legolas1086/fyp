from xml.etree.ElementInclude import include
from django.urls import path
from .views import FetchUser,FetchBookDetails,FetchBooks,PostBook,RegisterUser,Authenticate
from rest_framework import routers



urlpatterns = [
    path('users/',FetchUser.as_view()),
    path('books/',FetchBooks.as_view()),
    path('bookdetails/',FetchBookDetails.as_view()),
    path('posts/', PostBook.as_view()),
    path('register/',RegisterUser.as_view()),
    path('authenticate/',Authenticate.as_view()),
]