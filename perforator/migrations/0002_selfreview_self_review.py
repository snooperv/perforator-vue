# Generated by Django 3.1.7 on 2021-11-05 10:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('perforator', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='selfreview',
            name='self_review',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]