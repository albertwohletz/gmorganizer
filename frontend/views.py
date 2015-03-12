from django.shortcuts import render
from api import models

def home(request):
	current_user = request.user
	params = {
		'events': models.event.objects.filter(user=current_user),
		'subevents': models.subevent.objects.filter(user=current_user),
		'pcs': models.pc.objects.filter(user=current_user),
		'npcs': models.npc.objects.filter(user=current_user),

	}
	return render(request, 'main.html', params)