from django.shortcuts import render
from competitors.models import *
from django.http import HttpResponseRedirect,HttpResponse,HttpResponseForbidden
from django.shortcuts import render_to_response,redirect,get_object_or_404
import json
import httplib
from django.core import serializers

# search bar autocomplete

def api(domain,url,q):

	apiquerystr = url+str(q.replace(" ","%20"))
	dbquerystr = q
	connection = httplib.HTTPConnection(domain)
	headers = { 'X-Auth-Token': '24ba9245b0f7491b8aad81b0af2e330d' }
	connection.request('GET', apiquerystr, None, headers )
	response = json.loads(connection.getresponse().read().decode('latin-1'))
	return response


def search_autocomplete(request):
	q = request.GET.get('term', '')
	response = api('api.football-data.org','/alpha/teams?name=',q)
	dbquerystr = q
	team = []
	player = []
	items = []
	teams = Team.objects.filter(name__icontains=dbquerystr)
	players = Player.objects.filter(name__icontains=dbquerystr)
	resultlist = {}
	results = []
	for team in teams:
		resultlist={}
		resultlist['label'] = team.name
		resultlist['value'] = team.name
		results.append(resultlist)
	if response["teams"]:
		for team in response["teams"]:
			resultlist={}
			resultlist['label'] = team["name"].encode('latin-1')
			resultlist['value'] = team["name"].encode('latin-1')
			if not resultlist in results:
				print True
				results.append(resultlist)
			else :
				print False
	for player in players:
		resultlist={}
		resultlist['label'] = player.name
		resultlist['value'] = player.name
		results.append(resultlist)
	print results
	data = json.dumps(results)
	return HttpResponse(data, content_type='application/json')

def search(request):
	context = {}
	print request.POST
	print 1111
	teamInDB = False
	if 'search' in request.POST and request.POST['search']:
		name = request.POST['search'].strip()
		teams = Team.objects.filter(name__contains=name)
		players = Player.objects.filter(name__contains=name)
		for team in teams:
			if team.name == name:
				teamInDB = True
				break
		if not teamInDB:
			response = api('api.football-data.org','/alpha/teams?name=',name)
			if response["teams"]:
				for team in response["teams"]:
					if team["name"] == name:
						print ("addnewteam")
						cat = Category.objects.get(name="Soccer")
						info = api('api.football-data.org','/alpha/teams/',str(team["id"]))
						print info
						new_team = Team(id=team["id"],name=name,category=cat,icon_url=info["crestUrl"])
						new_team.save()
						teams = Team.objects.filter(name__contains=name)




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

def get_user_profile(request):
	userprofile = {}
	currentUser = {}
	result = {}
	if 'username' in request.GET and request.GET['username']:
		user = User.objects.get(username=request.GET['username'])
		userprofile = UserProfile.objects.get(user__username = request.GET['username']);
		print userprofile
		result["username"] = user.username
		result["first_name"] = user.first_name
		result["last_name"] = user.last_name
		result["birthday"] = json.dumps(userprofile.birthday.strftime('%Y,%m,%d'))
		result["social"] = {
			"email":user.email,
			"facebook":userprofile.facebook,
			"twitter":userprofile.twitter,
			"instagram":userprofile.instagram
		}
	data = json.dumps(result)
	return HttpResponse(data,content_type='application/json')

def get_favorite_teams(request):
	teamfollows = []
	if 'username' in request.GET and request.GET['username']:
		userprofile = UserProfile.objects.get(user__username = request.GET['username']);
		teamfollows = Team.objects.filter(followers__user=userprofile,followers__is_active=True)
	response_text = serializers.serialize('json',teamfollows)
	return HttpResponse(response_text,content_type='application/json')

def get_favorite_players(request):
	playerollows = []
	if 'username' in request.GET and request.GET['username']:
		userprofile = UserProfile.objects.get(user__username = request.GET['username']);
		playerfollows = Player.objects.filter(followers__user=userprofile,followers__is_active=True)
		print playerfollows
	response_text = serializers.serialize('json',playerfollows)
	return HttpResponse(response_text,content_type='application/json')

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


