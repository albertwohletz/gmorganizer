from django.shortcuts import render
from api import models

def home(request):
	current_user = request.user
	if current_user.is_authenticated():
		params = {
			'events': models.event.objects.filter(user=current_user),
			'subevents': models.subevent.objects.filter(user=current_user),
			'pcs': models.pc.objects.filter(user=current_user),
			'npcs': models.npc.objects.filter(user=current_user),
			'enemies': models.enemy.objects.filter(user=current_user),
			'gm': True
		}
		return render(request, 'main.html', params)
	else:
		return render(request, 'main.html')

def journal(request, username):
	user = models.User.objects.get(username=username)
	params = {
			'events': models.event.objects.filter(user=user).filter(hidden=False),
			'subevents': models.subevent.objects.filter(user=user, hidden=False),
			'pcs': models.pc.objects.filter(user=user, hidden=False),
			'npcs': models.npc.objects.filter(user=user, hidden=False),
			'enemies': models.enemy.objects.filter(user=user, hidden=False),
			'gm': False
		}
	return render(request, 'main.html', params)