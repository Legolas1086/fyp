# Generated by Django 3.2.5 on 2022-05-23 18:18

from django.db import migrations, models
import home.models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_books_sellerid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='books',
            name='image',
            field=models.ImageField(upload_to='', verbose_name=home.models.upload_to),
        ),
    ]
