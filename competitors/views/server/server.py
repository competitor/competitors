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

def team_page(request,id):
	context = {}
	print request.GET
	if 'cid' in request.GET and request.GET['cid']:
		cid = request.GET['cid']
		context['cid']=cid
		print cid
	if 'page' in request.GET and request.GET['page']:
		page = request.GET['page']
	else:
		page = 1;
	context['page'] = page
	team = []
	errors = []
	matches = []
	try:
		team = Team.objects.get(id=id)
		matcheshome = Match.objects.filter(home = team)
		matchesaway = Match.objects.filter(away = team)
		matches = matcheshome | matchesaway
	except ObjectDoesNotExist:
		errors.append('This team does not exist')
	form = PostForm()
	news = News.objects.filter(team__id=id)
	start = (int(page)-1)*5
	end = int(page)*5
	posts = Post.objects.filter(team__id=id).order_by("-time")[start:end]
	totalposts = Post.objects.filter(team__id=id).count()
	context['totalposts'] = totalposts
	try:
		follow = Follow.objects.get(user__user__username=request.user.username,team__id=id)
		context['follow'] = follow
	except ObjectDoesNotExist:
		context['not_follow'] = "not_follow"
	if request.user.has_perm('can_manage',team):
		context['can_manage'] = True
		print True
	else:
		context['can_manage'] = False
		print False
	players = Player.objects.filter(team__id=id)
	context['players'] = players
	context['team'] = team
	context['form'] = form
	context['matches'] = matches
	context['news'] = news
	context['posts'] = posts
	return render(request,'competitors/team.html',context)

def player_page(request,id):
	context = {}
	if 'cid' in request.GET and request.GET['cid']:
		cid = request.GET['cid']
		context['cid']=cid
	if 'page' in request.GET and request.GET['page']:
		page = request.GET['page']
	else:
		page = 1;
	context['page'] = page
	player = []
	errors = []
	posts = []
	# matches = []
	try:
		player = Player.objects.get(id=id)
	except ObjectDoesNotExist:
		errors.append('This team does not exist')
	try:
		team = Team.objects.get(id=player.team.id)
		matcheshome = Match.objects.filter(home = team)
		matchesaway = Match.objects.filter(away = team)
		matches = matcheshome | matchesaway
	except ObjectDoesNotExist:
		errors.append('This team does not exist')
	form = PostForm()
	news = News.objects.filter(player__id=id)
	start = (int(page)-1)*5
	end = int(page)*5
	posts = Post.objects.filter(player__id=id).order_by("-time")[start:end]
	totalposts = Post.objects.filter(player__id=id).count()
	context['totalposts'] = totalposts
	try:
		follow = Follow.objects.get(user__user__username=request.user.username,player__id=player.id)
		context['follow'] = follow
	except ObjectDoesNotExist:
		context['not_follow'] = "not_follow"
	context['player'] = player
	context['form'] = form
	context['matches'] = matches
	context['news'] = news
	context['posts'] = posts

	return render(request,'competitors/player.html',context)