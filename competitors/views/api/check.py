from competitors.models import *
from django.http import HttpResponseRedirect,HttpResponse,HttpResponseForbidden
from django.core.exceptions import ObjectDoesNotExist
import json
# register check username taken
def check_username(request):
	context = {}
	username = request.POST.get("username")
	try: 
		user = User.objects.get(username=username)
		data = "username has been taken"
	except ObjectDoesNotExist:
		if len(username)<4:
			data = "At least 4-letter long"
		else:
			data = ""
	return HttpResponse(data, content_type="text/plain")

# register check email taken
def check_email(request):
	context = {}
	email = request.POST.get("email")
	try: 
		user = User.objects.get(email=email)
		data = "This email is already registered"
	except ObjectDoesNotExist:
		data = ""
	return HttpResponse(data, content_type="text/plain")