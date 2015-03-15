from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class event(models.Model):
    user = models.ForeignKey(User)  
    name = models.CharField(max_length=100)
    text = models.CharField(max_length=5000)
    hidden = models.BooleanField(default=False)
    order = models.IntegerField()

class subevent(models.Model):
    user = models.ForeignKey(User)  
    event = models.ForeignKey(event)  
    name = models.CharField(max_length=100)
    text = models.CharField(max_length=5000)
    hidden = models.BooleanField(default=False)

class npc(models.Model):
    user = models.ForeignKey(User)  
    name = models.CharField(max_length=100)
    text = models.CharField(max_length=5000)
    hidden = models.BooleanField(default=False)

class pc(models.Model):
    user = models.ForeignKey(User)  
    name = models.CharField(max_length=100)
    text = models.CharField(max_length=5000)
    hidden = models.BooleanField(default=False)