from competitors.models import *
from django.http import HttpResponseRedirect,HttpResponse,HttpResponseForbidden
from django.shortcuts import render_to_response,redirect,get_object_or_404
import json

# search bar autocomplete
def search_autocomplete(request):
	q = request.GET.get('term', '')
	team = []
	player = []
	items = []
	print q
	teams = Team.objects.filter(name__icontains=q)
	players = Player.objects.filter(name__icontains=q)
	print players
	resultlist = {}
	results = []
	for team in teams:
		resultlist={}
		resultlist['label'] = team.name
		resultlist['value'] = team.name
		results.append(resultlist)
	for player in players:
		resultlist={}
		resultlist['label'] = player.name
		resultlist['value'] = player.name
		results.append(resultlist)
	data = json.dumps(results)
	return HttpResponse(data, content_type='application/json')

def search(request):
	context = {}
	print request.POST
	print 1111
	if 'search' in request.POST and request.POST['search']:
		name = request.POST['search'].strip()
		teams = Team.objects.filter(name__contains=name)
		players = Player.objects.filter(name__contains=name)
		number = teams.count() + players.count()
		if number == 0:
			context['errors'] = "Can not find what you want"
			return render(request,'competitors/searchresult.html',context)
		elif number == 1:
			if teams.count() == 1:
				for team in teams:
					return redirect('team/'+str(team.id))
			else:
				for player in players:
					return redirect('player/'+str(player.id))
				
		else:
			context['teams'] = teams
			context['players'] = players
			return render(request,'competitors/searchresult.html',context)
	else:
		print 222
		context['errors'] = 'request fault'
		return render(request,'competitors/index.html',context)

def get_country_list(request):
	countries = Country.objects.all()
	if 'data' in request.POST and request.POST['data']:
		cat = request.POST['data']
		countries = Country.objects.filter(sports__name=cat);
	response_text = serializers.serialize('json',countries)
	return HttpResponse(response_text,content_type='application/json')

def get_league_list(request):
	cat =[]
	country=[]
	if 'data' in request.POST and request.POST['data']:
		cat = request.POST['data']
	if 'country' in request.POST and request.POST['country']:
		country = request.POST['country']
	if country == '0':
		leagues = League.objects.filter(category__name=cat)
	else:
		leagues = League.objects.filter(category__name=cat,country__id=country)
	response_text = serializers.serialize('json',leagues)
	return HttpResponse(response_text,content_type='application/json')

def get_nation_list(request):
	print True
	country=[]
	nations = []
	teams = []
	leagues = []
	players = []
	nations = Country.objects.all()
	if 'data' in request.POST and request.POST['data']:
		cat = request.POST['data']
		nations = nations.filter(sports__name=cat)
	if 'team' in request.POST and request.POST['team']:
		teamid = request.POST['team']
		if teamid != '0':
			print teamid
			try:
				print nations
				teams = Team.objects.get(id=teamid)
				print nations
				players = Player.objects.filter(team=teams)
				nations = nations.filter(player__in=players)
			except ObjectDoesNotExist:
				print 'hahahahhh'
				teams = teams
		elif 'league' in request.POST and request.POST['league']:
			leagueid = request.POST['league']
			if leagueid != '0':
				teams = Team.objects.filter(league__id=leagueid)
				players = Player.objects.filter(team__in=teams)
				nations = nations.filter(player__in=players)
			elif 'country' in request.POST and request.POST['country']:
				countryid = request.POST['country']
				if countryid != '0':
					leagues = League.objects.filter(country__id=countryid)
					teams = Team.objects.filter(league__in=leagues)
					players = Player.objects.filter(team__in=teams)
					nations = nations.filter(player__in=players)
		
	print nations
	response_text = serializers.serialize('json',nations)
	return HttpResponse(response_text,content_type='application/json')

def get_team_list(request):
	leagueid = []
	leagues = []
	teams = Team.objects.all();
	if 'data' in request.POST and request.POST['data']:
		cat = request.POST['data']
		teams = teams.filter(category__name=cat)
	if 'league' in request.POST and request.POST['league']:
		leagueid = request.POST['league']
		if leagueid != '0':
			teams = teams.filter(league__id=leagueid)
		elif 'country' in request.POST and request.POST['country']:
			countryid = request.POST['country']
			if countryid != '0':
				leagues = League.objects.filter(country__id=countryid)
				teams = teams.filter(league__in=leagues)
				print 'tttttttt'
	print teams


	response_text = serializers.serialize('json',teams)
	return HttpResponse(response_text,content_type='application/json')	

def get_player_list(request):
	teamid = []
	players = []
	print request.POST
	if 'data' in request.POST and request.POST['data']:
		cat = request.POST['data']
		players = Player.objects.filter(category__name=cat)

	if 'team' in request.POST and request.POST['team']:
		teamid = request.POST['team']
		if teamid != '0':
			players = players.filter(team__id=teamid)
		else:
			if 'league' in request.POST and request.POST['league']:
				leagueid = request.POST['league']
				if leagueid != '0':
					teams = Team.objects.filter(league__id=leagueid)
					players = players.filter(team__in = teams)
				else:
					if 'country' in request.POST and request.POST['country']:
						countryid = request.POST['country']
						if countryid != '0':
							leagues = League.objects.filter(country__id=countryid)
							players = players.filter(team__league__in=leagues)
	if 'nation' in request.POST and request.POST['nation']:
		nationid = request.POST['nation']
		if nationid != '0':
			players = players.filter(nationality__id=nationid)	
				
	
	response_text = serializers.serialize('json',players)
	return HttpResponse(response_text,content_type='application/json')


