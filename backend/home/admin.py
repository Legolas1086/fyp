from django.contrib import admin
from .models import Users,Books,chatHistory,Keys
# Register your models here.

class UsersAdmin(admin.ModelAdmin):
    list_display = ['id','username','email','password','branch','interests']

class BooksAdmin(admin.ModelAdmin):
    list_display = ['isbn','bookname','author','category','publisher','description','cost','image','sellerid']

class chatHistoryAdmin(admin.ModelAdmin):
    list_display = ['chatid','sender','receiver','timestamp','message','messageReceiver']

class keysAdmin(admin.ModelAdmin):
    list_display = ['id','userid','publicKey','privateKey']

admin.site.register(Users,UsersAdmin)
admin.site.register(Books,BooksAdmin)
admin.site.register(chatHistory,chatHistoryAdmin)
admin.site.register(Keys,keysAdmin)
