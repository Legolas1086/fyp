# Generated by Django 3.2.5 on 2022-06-16 17:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0013_books_sold'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='searchHistory',
            field=models.CharField(default=' ', max_length=100000),
        ),
    ]
