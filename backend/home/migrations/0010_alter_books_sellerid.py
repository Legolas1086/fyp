# Generated by Django 3.2.5 on 2022-05-27 16:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0009_alter_users_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='books',
            name='sellerid',
            field=models.ForeignKey(default='1', on_delete=django.db.models.deletion.CASCADE, to='home.users'),
        ),
    ]