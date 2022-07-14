from xml.etree.ElementInclude import include
from django.urls import path
from .views import FetchUser,FetchBookDetails,getUsername,getKeys,getprivate,getpublic,FetchBooks,PostBook,getWishlist,Profile,Wishlist,RegisterUser,Authenticate,MyBooks,displayChat,SearchBook,postChat,EditBook,getUsersChat, similarBooks



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
    path('addwish/',Wishlist.as_view()),
    path('profile/',Profile.as_view()),
    path('getwish/',getWishlist.as_view()),
    path('keys/',getKeys.as_view()),
    path('publickey/',getpublic.as_view()),
    path('privatekey/',getprivate.as_view()),
    path('getusername/',getUsername.as_view()),
]