# Generated by Django 3.2.5 on 2022-07-14 19:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0017_auto_20220713_1457'),
    ]

    operations = [
        migrations.AddField(
            model_name='chathistory',
            name='messageReceiver',
            field=models.CharField(default='text', max_length=100000000),
        ),
        migrations.AlterField(
            model_name='chathistory',
            name='message',
            field=models.CharField(max_length=100000000),
        ),
    ]