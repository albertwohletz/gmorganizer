from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class event(models.Model):
    id = models.IntegerField(primary_key=True)
    user = User()
    name = models.CharField(max_length=100)
    text = models.CharField(max_length=5000)
    hidden = models.BooleanField(default=False)

class subevent(models.Model):
    id = models.IntegerField(primary_key=True)
    user = User()
    event = event()
    name = models.CharField(max_length=100)
    text = models.CharField(max_length=5000)
    hidden = models.BooleanField(default=False)

class npc(models.Model):
    id = models.IntegerField(primary_key=True)
    user = User()
    name = models.CharField(max_length=100)
    text = models.CharField(max_length=5000)
    hidden = models.BooleanField(default=False)

class pc(models.Model):
    id = models.IntegerField(primary_key=True)
    user = User()
    name = models.CharField(max_length=100)
    text = models.CharField(max_length=5000)
    hidden = models.BooleanField(default=False)