# Generated by Django 3.2.5 on 2022-05-27 16:02

from django.db import migrations, models
import sqlalchemy.sql.expression


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0008_auto_20220527_0102'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False, unique=sqlalchemy.sql.expression.true),
        ),
    ]
