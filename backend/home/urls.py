from xml.etree.ElementInclude import include
from django.urls import path
from .views import Demo
from rest_framework import routers



urlpatterns = [
    path('demo/',Demo.as_view()),
]