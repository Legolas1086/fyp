from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from sqlalchemy import true
from yaml import serialize
from .models import Users
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import UserSerializer


class Demo(APIView):
    def get(self,request):
        user = Users.objects.all()
        serialize = UserSerializer(user,many=true)
        return Response(serialize.data)
