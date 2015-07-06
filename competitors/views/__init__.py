from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from competitors.models import *
from competitors.forms import *
from django.core import serializers
from django.http import HttpResponse,Http404
from django.contrib.auth import login,authenticate
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect,HttpResponse,HttpResponseForbidden
from django.shortcuts import render_to_response,redirect,get_object_or_404
from django.contrib.auth.forms import AuthenticationForm
import json
from django.core.mail import send_mail
from django.core.urlresolvers import reverse
from django.db import transaction
from django.contrib.auth.tokens import default_token_generator
from django.db.models import Count
import base64
from base64 import b64decode
from django.core.files.base import ContentFile
import os
from django.conf import settings
import pytz # $ pip install pytz
from tzlocal import get_localzone # $ pip install tzlocal
from django.utils import timezone
from random import randint

from server import *
from api import *
