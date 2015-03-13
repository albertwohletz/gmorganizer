from api import models
from django.http import HttpResponse, HttpResponseBadRequest
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def create(request):
	current_user = request.user
	name = request.POST['name']
	text = request.POST['text']
	hidden = request.POST['hidden']
	model_type = request.POST['type']

	# Mask hidden to bool
	if hidden == 'false':
		hidden = False
	else:
		hidden = True

	obj = None
	if model_type == 'event':
		obj = models.event(name=name, text=text, hidden=hidden, user=current_user)
	elif model_type == 'subevent':
		event_id = request.POST['event']
		event = models.event.objects.filter(id=event_id, user=current_user)
		if event:
			obj = models.subevent(name=name, text=text, hidden=hidden, user=current_user, event=event[0])

	if obj:
		obj.save()
		return HttpResponse(json.dumps({'id': obj.id, 'success': True}))
	else:
		return HttpResponseBadRequest('No object saved')


@csrf_exempt
def delete(request):
	print request.GET
	current_user = request.user
	id = request.GET['id']
	print id

	# Delete this guy, but make sure user=user so you can't game the api call to sabotage others.
	models.event.objects.filter(id=id, user=current_user).delete()
	return HttpResponse("Success")

@csrf_exempt
def save(request):
	return HttpResponse("Success")

