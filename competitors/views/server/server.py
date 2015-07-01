from competitors.models import *
from random import randint
from django.db.models import Count
from django.shortcuts import render

def home(request):
	context = {}
	#print request.user
	if request.user.id > 0: # If user has logged in
		userprofile = UserProfile.objects.get(user=request.user)
		teams = Team.objects.filter(followers__user=userprofile,followers__is_active=True).order_by("-followers__credits")[0:6]
		players = Player.objects.filter(followers__user=userprofile,followers__is_active=True).order_by("-followers__credits")[0:6]
	else: # Anonymous user
		count1 = Team.objects.all().count()-5
		count2 = Player.objects.all().count()-5
		start1=randint(0,max(count1,1))
		end1 = start1+5;
		start2 = randint(0,max(count2,1))
		end2 = start2+5
		teams = Team.objects.annotate(num=(Count('followers'))).order_by('-num')[0:6]
		players = Player.objects.annotate(num=(Count('followers'))).order_by('-num')[0:6]
	context['teams'] = teams
	context['players'] = players
	context['homepage'] = True
	return render(request,'competitors/index.html',context)