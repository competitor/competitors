from django.db import models
from django.contrib.auth.models import User
from ckeditor.fields import RichTextField

# Create your models here.

class UserProfile(models.Model):
	user = models.ForeignKey(User)
	age = models.DecimalField(max_digits=3,decimal_places=0,null=True,blank=True)
	bio = models.CharField(max_length=1000,blank=True)
	img_url = models.CharField(max_length=99999,default="/static/competitors/img/admin.jpg")

	# facebook char
	# twitter char
	# instagram char
	# weibo char
	# wechat char

	# birthday Date

	# friend manytomany User add_relation_name


	
	def natural_key(self):
		return self.user.username
	
	def __unicode__(self):
		return self.user.username

class News(models.Model):
	title = models.CharField(max_length=100)
	content = RichTextField()
	time = models.DateTimeField(auto_now_add=True)
	def __unicode__(self):
		return self.title
	class Meta:
		permissions = (
				("can_add", "Can add"),
				("can_change", "Can change"),
				("can_delete", "Can delete"),
			)

class Event(models.Model):
	content = models.CharField(max_length=500)
	time = models.CharField(max_length=100)
	def __unicode__(self):
		return self.content
	class Meta:
		permissions = (
				("can_add", "Can add"),
				("can_change", "Can change"),
				("can_delete", "Can delete"),
			)

class Comment(models.Model):
	content = models.CharField(max_length=160)
	user = models.ForeignKey(UserProfile)
	time = models.DateTimeField(auto_now_add=True)
	def __unicode__(self):
		return self.content
	class Meta:
		permissions = (
				("can_delete", "Can delete"),

			)

class Post(models.Model):
	title = models.CharField(max_length=100)
	content = models.CharField(max_length=1000)
	user = models.ForeignKey(UserProfile)
	time = models.DateTimeField(auto_now_add=True)
	comments = models.ManyToManyField(Comment,blank=True)
	def __unicode__(self):
		return self.title
	class Meta:
		permissions = (
				("can_delete", "Can delete"),
			)

class Category(models.Model):
	name = models.CharField(max_length=40)
	def __unicode__(self):
		return self.name

class Country(models.Model):
	name = models.CharField(max_length=40)
	sports = models.ManyToManyField(Category)
	def __unicode__(self):
		return self.name

class League(models.Model):
	name = models.CharField(max_length=40)
	country = models.ForeignKey(Country,null=True)
	category = models.ForeignKey(Category)
	def __unicode__(self):
		return self.name

class Follow(models.Model):
	description = models.CharField(max_length=100)
	credits = models.BigIntegerField(default=0)
	user = models.ForeignKey(UserProfile,related_name='userprofile')
	is_active = models.BooleanField(default=True)
	def __unicode__(self):
		return self.description

class Team(models.Model):
	name = models.CharField(max_length=256)
	league = models.ForeignKey(League,blank=True,null=True)
	icon_url = models.CharField(max_length=256,default='url')
	posts = models.ManyToManyField(Post,blank=True)
	news = models.ManyToManyField(News,blank=True)
	category = models.ForeignKey(Category)
	followers = models.ManyToManyField(Follow,blank=True,null=True)
	def __unicode__(self):
		return self.name
	class Meta:
		permissions = (
				("can_manage", "Can manage"),

			)

class Player(models.Model):
	name = models.CharField(max_length=20)
	role = models.CharField(max_length=20)
	team = models.ForeignKey(Team,null=True,blank=True)
	icon_url = models.CharField(max_length=9999,default='url')
	category = models.ForeignKey(Category)
	nationality = models.ForeignKey(Country)
	posts = models.ManyToManyField(Post,blank=True)
	news = models.ManyToManyField(News,blank=True)
	followers = models.ManyToManyField(Follow,blank=True,null=True)
	def __unicode__(self):
		return self.name
	class Meta:
		permissions = (
				("can_manage", "Can manage"),
			)

class Match(models.Model):
	home = models.ForeignKey(Team,related_name='home')
	away = models.ForeignKey(Team,related_name='away')
	time = models.DateTimeField(auto_now_add=False,auto_now=False)
	score = models.CharField(max_length=100,blank=True)
	events = models.ManyToManyField(Event,blank=True)
	comments = models.ManyToManyField(Comment,blank=True)
	def __unicode__(self):
		return self.home.name + " vs "+self.away.name
	class Meta:
		permissions = (
				("can_broadcast", "Can broadcast"),
			)
class Fileofuser(models.Model):
	description = models.CharField(max_length=100,blank=True)
	fileuploaded = models.FileField(upload_to='img/users',blank=True)
	def __unicode__(self):
		return self.description

class Fileofsystem(models.Model):
	description = models.CharField(max_length=100)
	fileuploaded = models.FileField(upload_to='files',blank=True)
	url = models.CharField(max_length=99999)










