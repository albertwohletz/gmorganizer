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
	model_type = request.POST['type'].lower()

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
	elif model_type == 'npc':
		obj = models.npc(name=name, text=text, hidden=hidden, user=current_user)
	elif model_type == 'pc':
		obj = models.pc(name=name, text=text, hidden=hidden, user=current_user)
		
	if obj:
		obj.save()
		obj.order = obj.id
		obj.save()
		return HttpResponse(json.dumps({'id': obj.id, 'success': True}))
	else:
		return HttpResponseBadRequest('No object saved')

@csrf_exempt
def reorder(request):
	current_user = request.user
	order = request.POST.getlist('order[]')
	model_type = request.POST['type']

	if model_type == 'event':
		query = models.event.objects.filter(user=current_user)
	elif model_type == 'subevent':
		event_id = request.POST['event']
		query = models.subevent.objects.filter(user=current_user, event_id=event_id)
	elif model_type == 'pc':
		query = models.pc.objects.filter(user=current_user)
	elif model_type == 'npc':
		query = models.npc.objects.filter(user=current_user)
	else:
		return HttpResponseBadRequest('No object saved')

	print order
	for obj in query:
		print obj.id, order.index(str(obj.id));
		obj.id = order.index(str(obj.id));
	for obj in query:
		obj.save()

	return HttpResponse("Good Job")

@csrf_exempt
def delete(request):
	current_user = request.user
	id = request.GET['id']
	model_type = request.GET['type'].lower()

	if model_type == 'event':
		models.event.objects.filter(id=id, user=current_user).delete()
	elif model_type == 'subevent':
		models.subevent.objects.filter(id=id, user=current_user).delete()
	elif model_type == 'npc':
		models.npc.objects.filter(id=id, user=current_user).delete()
	elif model_type == 'pc':
		models.pc.objects.filter(id=id, user=current_user).delete()

	return HttpResponse("Success")

@csrf_exempt
def hide(request):
	id = request.GET['id']
	hide = request.GET['hide']
	model_type = request.GET['type'].lower()
	current_user = request.user

	if model_type == 'event':
		obj = models.event.objects.filter(id=id, user=current_user)
	elif model_type == 'subevent':
		obj = models.subevent.objects.filter(id=id, user=current_user)
	elif model_type == 'npc':
		obj = models.npc.objects.filter(id=id, user=current_user)
	elif model_type == 'pc':
		obj = models.pc.objects.filter(id=id, user=current_user)

	obj.hidden = hide
	obj.save()
	return HttpResponse("Success")

@csrf_exempt
def save(request):
	id = request.POST['id']
	model_type = request.POST['type'].lower()
	name = request.POST['name']
	text = request.POST['text']
	hidden = request.POST['hidden']
	current_user = request.user

	# Mask hidden to bool
	if hidden == 'false':
		hidden = False
	else:
		hidden = True
		
	if model_type == 'event':
		obj = models.event.objects.filter(id=id, user=current_user).get()
	elif model_type == 'subevent':
		obj = models.subevent.objects.filter(id=id, user=current_user).get()
	elif model_type == 'npc':
		obj = models.npc.objects.filter(id=id, user=current_user).get()
	elif model_type == 'pc':
		obj = models.pc.objects.filter(id=id, user=current_user).get()

	obj.name = name
	obj.text = text
	obj.hidden = hidden
	obj.save()
	return HttpResponse("Success")

