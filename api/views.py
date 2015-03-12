from api import models
from django.http import HttpResponse
from django.contrib.auth import authenticate
import json

#def add_char(request):
#    # Get Request Information
#    name = request.GET['name']
#    image = request.GET['image']
#    hp = request.GET['hp']
#    ac = request.GET['ac']
#    count = int(request.GET['count'])
#
#    # Create new entries in DB
#    for i in range(0, count):
#        new_char = models.Chars(name=name + ' ' + str(i + 1), image=image, hp=hp, ac=ac)
#        new_char.save()
#
#    return HttpResponse("Success")
# Create your views here.

def create(request):
	current_user = request.user
	name = request.GET['name']
	text = request.GET['text']
	hidden = request.GET['hidden']

	event = models.event(name=name, text=text, hidden=hidden, user=current_user)
	event.save()

	return HttpResponse({'id': event.id})

def save(request):
	return HttpResponse("Success")
