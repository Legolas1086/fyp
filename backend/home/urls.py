from xml.etree.ElementInclude import include
from django.urls import path
from .views import FetchUser,FetchBookDetails,FetchBooks
from rest_framework import routers



urlpatterns = [
    path('users/',FetchUser.as_view()),
    path('books/',FetchBooks.as_view()),
    path('bookdetails/',FetchBookDetails.as_view()),
]