# Generated by Django 3.2.5 on 2022-05-23 17:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='books',
            name='sellerid',
            field=models.CharField(default='0000000001', max_length=10),
        ),
    ]
