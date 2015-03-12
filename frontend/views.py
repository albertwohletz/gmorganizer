from django.shortcuts import render
from api import models

def home(request):
	params = {}
    return render(request, 'main.html', params)