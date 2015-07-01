from competitors.models import *
from django.http import HttpResponseRedirect,HttpResponse,HttpResponseForbidden
import json
def check_username(request):
	context = {}
	# print 123
	# print request
	# data = "hahahahh"
	username = request.POST["username"]
	try: 
		user = User.objects.get(username=username)
		data = "username has been taken"
	except ObjectDoesNotExist:
		if len(username)<4:
			data = "At least 4-letter long"
		else:
			data = ""
	return HttpResponse(data, content_type="text/plain")

def check_email(request):
	context = {}
	# print 123
	# print request
	# data = "hahahahh"
	email = request.POST["email"]
	try: 
		user = User.objects.get(email=email)
		data = "This email is already registered"
	except ObjectDoesNotExist:
		data = ""
	return HttpResponse(data, content_type="text/plain")