@login_required
@transaction.atomic
def edit(request):
    currentUser = UserProfile.objects.get(user__username=request.user.username)
    try:
        if request.method == 'GET':
            user = UserProfile.objects.get(user__username=request.user)
            form = EditForm(instance = user)
            context = { 'User': user, 'form': form }
            return render(request, 'competitors/edit.html', context)
        user = request.user
        form = EditForm(request.POST,instance=currentUser)
        if not form.is_valid():
            context = { 'user': user, 'form': form }
            return render(request, 'competitors/edit.html', context)

        form.save()
        errors = {}
        # form = EditForm(instance=user)
        
        context = {'user' : user, 
                    'errors' : errors, 
                    'currentUser':currentUser}
        return render(request, 'competitors/profile.html', context)
    except User.DoesNotExist:
        context = { 'message': 'Record with id={0} does not exist'.format(id) }
        return render(request, 'competitors/profile.html', context)

@login_required
@transaction.atomic
def follow(request,tp,id):
    errors = []
    context = {}
    user = UserProfile.objects.get(user=request.user)
    if tp == 'team':
    	team = Team.objects.get(id=id)
    	try:
    		follow = Follow.objects.get(description='team'+str(id),user=user)
    	except ObjectDoesNotExist:
    		follow = Follow(user=user,description='team'+str(team.id),is_active=True)
    		follow.save()
    	team.followers.add(follow)
    	team.save()
    elif tp == 'player':
    	player = Player.objects.get(id=id)
    	try:
    		follow = Follow.objects.get(description='player'+str(id))
    	except ObjectDoesNotExist:
    		follow = Follow(user=user,description='player'+str(player.id),is_active=True)
    		follow.save()
    	player.followers.add(follow)
    	player.save()
    print "imhere"
    return redirect('/'+tp+'/'+id)

@login_required
@transaction.atomic
def change_img(request):
    context = {}
    user = UserProfile.objects.get(user__username = request.user.username) 
    currentUser = UserProfile.objects.get(user__username=request.user.username)                     
    form = ChangeImageForm(request.POST,request.FILES,instance=currentUser)
    print request.POST
    if request.POST['data']:
    	print request.POST['data']
    	url = s3_upload(request.POST['data'], currentUser.user.id)
    	currentUser.picture = url
    	currentUser.save()
    context['form'] = ChangeImageForm()
    context['user'] = user
    context['currentUser'] = currentUser

    return render(request, 'competitors/profile.html', context)

@login_required
@transaction.atomic
def save_pic(request):
	user = UserProfile.objects.get(user=request.user)
	userAdjustedImage_decoded = {}
	if request.is_ajax() and request.POST:
		userAdjustedImage = request.POST.get("userAdjustedImage")
		userAdjustedImage_decoded=base64.b64decode(userAdjustedImage)
        #print "userAdjustedImage_decoded",userAdjustedImage_decoded
        filename_uploadedImage = "UserAdjustedPic.png"
        imagene = ContentFile(userAdjustedImage_decoded, 'user_'+str(user.user.id)+'.png')
        newfile = Fileofuser(description='user_'+str(user.user.id)+'_img',fileuploaded=imagene)
        newfile.save()
        path = newfile.fileuploaded.path
        path = path.split("/")[-1]
        user.img_url="/static/competitors/img/users/"+path
        print user.img_url
        user.save() 
	return redirect('home')

@login_required
@transaction.atomic
def get_userphoto(request, username):
    user = get_object_or_404(UserProfile, username=username)
    if not user.picture:
        raise Http404
    return HttpResponse(user.picture)