@login_required
@transaction.atomic
def add_post(request):
    errors = []
    context = {}
    # user = UserInfo.objects.get(user__user__username=request.user.username)
    # Creates a new item if it is present as a parameter in the request
    form = PostForm(request.POST)
    context['form'] = form
    next = request.POST.get('redirecturl')
    if not form.is_valid():
        return redirect(next+"?cid=3")
    else:
    	user = UserProfile.objects.get(user=request.user)
    	new_post = Post(title = form.cleaned_data['title'], 
    					content = form.cleaned_data['content'],
    					user=user)
    	new_post.save()
    	if 'cat' in request.POST and request.POST['cat']:
    		if request.POST['cat'] == 'team':
	    		id = request.POST['id']
	    		team = Team.objects.get(id=id)
	    		team.posts.add(new_post)
	    		team.save()
	    		follow = Follow.objects.get(user__user__username=request.user.username,team=team)
	    		follow.credits = follow.credits + 5;
	    		follow.save()
	    	elif request.POST['cat'] == 'player':
	    		id = request.POST['id']
	    		player = Player.objects.get(id=id)
	    		player.posts.add(new_post)
	    		player.save()
	    		follow = Follow.objects.get(user__user__username=request.user.username,player=player)
	    		follow.credits = follow.credits + 5;
	    		follow.save()
	    	else:
	    		context['errors'] = "errors"
    return redirect(next+'?cid=3')

@login_required
@transaction.atomic
def add_comment(request,id):
    
    post = Post.objects.get(id = id)
    errors = []
    comments = {}
    form = CommentForm(request.POST)
    next = request.POST['redirecturl']
    if not form.is_valid():
        error="please write your comment"
        context={'errors':error}
        return render(request, 'competitors/index.html', context)
    else:
    	user = UserProfile.objects.get(user=request.user)
        new_comment = Comment( 
    					content = form.cleaned_data['content'],
    					user=user)
        new_comment.save()
        post.comments.add(new_comment)
        post.save()
        try:
        	team = Team.objects.get(posts=post)
        	follow = Follow.objects.get(user__user__username=request.user.username,team=team)
	    	follow.credits = follow.credits + 2;
	    	follow.save()
        except ObjectDoesNotExist:
        	try:
        		player = Player.objects.get(posts=post)
        		follow = Follow.objects.get(user__user__username=request.user.username,player=player)
	    		follow.credits = follow.credits + 2;
	    		follow.save()
	    	except ObjectDoesNotExist:
	    		post.save()
   	return redirect(next)

@login_required
@transaction.atomic
def delete_post(request,id):
	user = request.user
	next = '/'
	print request.path
	try:
		post = Post.objects.get(id=id)
	except ObjectDoesNotExist:
		return redirect(next+'?cid=3')
	try:
		team = Team.objects.get(posts=post)
		next = '/team/'+str(team.id)
		if user.has_perm('can_manage',team):
			post.delete()
	except ObjectDoesNotExist:
		try:
			player = Player.objects.get(post=post)
			next = '/player/'+ str(player.id)
			if user.has_perm('can_manage',player):
				post.delete()
		except ObjectDoesNotExist:
			return redirect(next+'?cid=3')
	return redirect(next+'?cid=3')

@login_required
@transaction.atomic
def delete_comment(request,id):
	user = request.user
	data = []
	try:
		comment = Comment.objects.get(id=id)
		print comment
	except ObjectDoesNotExist:
		data = "Such Comment Does Not Exist"
	try:
		match = Match.objects.get(comments=comment)
		if user.has_perm('can_manage',match):
			comment.delete()
	except ObjectDoesNotExist:
		try:
			post = Post.objects.get(comments=comment)
			try:
				team = Team.objects.get(posts=post)
				if user.has_perm('can_manage',team):		
					comment.delete()
			except ObjectDoesNotExist:
				try:
					player = Player.objects.get(post=post)
					next = '/player/'+ str(player.id)
					if user.has_perm('can_manage',player):
						comment.delete()
				except ObjectDoesNotExist:
					data = "Such Comment Does Not Exist"
		except ObjectDoesNotExist:
			data = "Such Comment Does Not Exist"
	return HttpResponse(data, content_type="text/plain")