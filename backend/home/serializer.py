from attr import field
from rest_framework import serializers
from .models import Users,Books,chatHistory

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'

class BooksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Books
        fields = '__all__'

class chatHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = chatHistory
        fields = '__all__'