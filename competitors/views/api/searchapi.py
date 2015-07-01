from competitors.models import *
from django.http import HttpResponseRedirect,HttpResponse,HttpResponseForbidden
import json

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
