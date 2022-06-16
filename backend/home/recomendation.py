from django.conf import settings
from .models import Books,Users
from django.core.mail import send_mail
from django.conf import settings

def sendMail(book):
    users = Users.objects.all()
    emails = []
    for user in users:
        if book['bookname'] in user.interests or book['bookname'] in user.searchHistory:
            emails.append(user.email)
    print(emails)

    send_mail('Book you were looking for',book['bookname']+'is up for sale, buy it before somebody else does, Regards Pusthak Bandaar',settings.EMAIL_HOST_USER,emails)