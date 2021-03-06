from xml.etree.ElementInclude import include
from django.urls import path
from .views import FetchUser,FetchBookDetails,FetchBooks,getWishlist,PostBook,RegisterUser,Wishlist,Profile,Authenticate,MyBooks,displayChat,SearchBook,postChat,EditBook,getUsersChat,similarBooks
from rest_framework import routers



urlpatterns = [
    path('users/',FetchUser.as_view()),
    path('books/',FetchBooks.as_view()),
    path('bookdetails/',FetchBookDetails.as_view()),
    path('posts/', PostBook.as_view()),
    path('register/',RegisterUser.as_view()),
    path('authenticate/',Authenticate.as_view()),
    path('mybooks/',MyBooks.as_view()),
    path('chats/',displayChat.as_view()),
    path('searchbook/',SearchBook.as_view()),
    path('postchat/',postChat.as_view()),
    path('editbook/',EditBook.as_view()),
    path('getuserschat/',getUsersChat.as_view()),
    path('similarbooks/',similarBooks.as_view()),
    path('profile/',Profile.as_view()),
    path('wish/',Wishlist.as_view()),
    path('getwish/',getWishlist.as_view()),
]