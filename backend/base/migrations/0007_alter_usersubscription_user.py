# Generated by Django 3.2.5 on 2021-07-11 16:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_rename_user_full_name_usersubscription_user_details'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usersubscription',
            name='user',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]
