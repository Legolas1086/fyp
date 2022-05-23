from django.contrib import admin
from .models import Users,Books
# Register your models here.

class UsersAdmin(admin.ModelAdmin):
    list_display = ['id','username','email','password','branch','interests']

class BooksAdmin(admin.ModelAdmin):
    list_display = ['isbn','bookname','author','category','publisher','description','cost','image','sellerid']

admin.site.register(Users,UsersAdmin)
admin.site.register(Books,BooksAdmin)
