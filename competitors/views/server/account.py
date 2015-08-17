from django.shortcuts import render
from competitors.models import *
from competitors.forms import *
from django.core.urlresolvers import reverse
from django.db import transaction
from django.contrib.auth import login,authenticate
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail

@transaction.atomic
def register(request):
    context = {}
    context['signuppage'] = True
    if request.method == 'GET':

        context['form'] = RegistrationForm()
        return render(request, 'registration/register.html', context)

    # Creates a bound form from the request POST parameters and makes the 
    # form available in the request context dictionary.
    form = RegistrationForm(request.POST)
    context['form'] = form

    # Validates the form.
    if not form.is_valid():
        return render(request, 'registration/register.html', context)
    

  
    new_user = User.objects.create_user(username = form.cleaned_data['username'], 
                                        password = form.cleaned_data['password1'],
                                        first_name = form.cleaned_data['first_name'],
                                        email = form.cleaned_data['email'],
                                        last_name=form.cleaned_data['last_name']
                                      )
    
    # # new_user.UserInfo.age=form.cleaned_data['age']

    new_user.is_active = False

    new_user.save()

    user = UserProfile(user = new_user)

    user.save()   

    new_user = authenticate(username = request.POST['username'], \
                          password = request.POST['password1'])


    token = default_token_generator.make_token(new_user)

    email_body = """
Welcome to COMPETITORS.  Please click the link below to
verify your email address and complete the registration of your account:

  http://%s%s
""" % (request.get_host(), 
       reverse('confirm', args=(new_user.username, token)))

    send_mail(subject="Verify your email address",
              message= email_body,
              from_email="maot@andrew.cmu.edu",
              recipient_list=[new_user.email])

    context['email'] = form.cleaned_data['email']

    print new_user.is_active
 
    return render(request, 'registration/needs-confirmation.html', context)

@transaction.atomic
def confirm_registration(request, username, token):
    user = get_object_or_404(User, username=username)

    # Send 404 error if token is invalid
    if not default_token_generator.check_token(user, token):
        raise Http404

    # Otherwise token was valid, activate the user.
    user.is_active = True
    user.save()
    return render(request, 'registration/confirmed.html', {})

@transaction.atomic
def change_password(request):
	context = {}
	email = []
	if request.method == 'GET':
		return render(request, 'registration/change_password.html', context)

	if 'email' in request.POST and request.POST['email']:
		email = request.POST['email']
	else:
		context['errors'] = "Please input your email address"
		return render(request, 'registration/change_password.html', context)

	try:
		new_user = User.objects.get(email=email)
	except ObjectDoesNotExist:
		context['errors'] = "This email has not been registered."
		return render(request, 'registration/change_password.html', context)

	token = default_token_generator.make_token(new_user)

	email_body = """Your username is:"""+ new_user.username+""".
	If you would like to reset your password, please click the link below to change your password:
	http://%s%s
""" % (request.get_host(), 
	reverse('confirm_change', args=(new_user.username,token)))
	print new_user.email
	send_mail(subject="Password Change",
			message= email_body,
			from_email="maot@andrew.cmu.edu",
			recipient_list=[new_user.email])

	context['email'] = new_user.email


	return render(request, 'registration/password_change_request_sent.html', context)

@transaction.atomic
def confirm_change(request, username, token):
    user = get_object_or_404(User, username=username)

    # Send 404 error if token is invalid
    if not default_token_generator.check_token(user, token):
        raise Http404

    form = ChangePasswordForm(initial={'username': username})
    context = {}
    context['form'] = form
    context['username'] = user.username
    # Otherwise token was valid, activate the user.
    # user.is_active = True
    # user.save()
    return render(request, 'registration/change_password_form.html', context)

@transaction.atomic
def change_password_done(request):
	context = {}
	username = {}
	if "username" in request.POST and request.POST['username'] :
		username = request.POST['username']
	else:
		return render(request, 'competitors/index.html')
	user = User.objects.get(username = username)

# Send 404 error if token is invalid
	# if not default_token_generator.check_token(user, token):
	# 	raise Http404
	form = ChangePasswordForm(request.POST)
	if not form.is_valid():
		context['errors'] = "Please input two same passwords"
		form = ChangePasswordForm(initial={'username': username})
		context['form'] = form
		return render(request, 'registration/change_password_form.html', context)
	
	user.set_password(request.POST['password1'])
	user.save()
	
	

	return redirect(home)