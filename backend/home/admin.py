from django.contrib import admin
from .models import Users,Books
# Register your models here.

class UsersAdmin(admin.ModelAdmin):
    list_display = ['id','username','email','password','branch','interests']

admin.site.register(Users,UsersAdmin)
