from django import forms
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import User
from models import *
from django.core.validators import validate_email, RegexValidator
from models import *
from ckeditor.widgets import CKEditorWidget



MAX_UPLOAD_SIZE = 2500000

class ChangePasswordForm(forms.Form):
    username   = forms.CharField(max_length = 20,widget=forms.HiddenInput())
    password1  = forms.CharField(max_length = 200, 
                                 label='Password', 
                                 widget = forms.PasswordInput())
    password2  = forms.CharField(max_length = 200, 
                                 label='Confirm password',  
                                 widget = forms.PasswordInput())
    def clean(self):
        # Calls our parent (forms.Form) .clean function, gets a dictionary
        # of cleaned data as a result
        cleaned_data = super(ChangePasswordForm, self).clean()

        # Confirms that the two password fields match
        password1 = cleaned_data.get('password1')
        password2 = cleaned_data.get('password2')
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords did not match.")

        # We must return the cleaned data we got from our parent.
        return cleaned_data

class RegistrationForm(forms.Form):
    first_name = forms.CharField(max_length=20,
                                label='Firstname',widget=forms.TextInput(attrs={'autocomplete':'off'}))
    last_name  = forms.CharField(max_length=20,label='Lastname',widget=forms.TextInput(attrs={'autocomplete':'off'}))
    username   = forms.CharField(max_length = 20,widget=forms.TextInput(attrs={'autocomplete':'off'}))
    email      = forms.CharField(max_length = 200,widget=forms.TextInput(attrs={'autocomplete':'off'}))
    password1  = forms.CharField(max_length = 200, 
                                 label='Password', 
                                 widget = forms.PasswordInput(attrs={'autocomplete':'off'}))
    password2  = forms.CharField(max_length = 200, 
                                 label='Confirm password',  
                                 widget = forms.PasswordInput(attrs={'autocomplete':'off'}))
   
    # Customizes form validation for properties that apply to more
    # than one field.  Overrides the forms.Form.clean function.
    def clean(self):
        # Calls our parent (forms.Form) .clean function, gets a dictionary
        # of cleaned data as a result
        cleaned_data = super(RegistrationForm, self).clean()

        # Confirms that the two password fields match
        password1 = cleaned_data.get('password1')
        password2 = cleaned_data.get('password2')
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords did not match.")

        # We must return the cleaned data we got from our parent.
        return cleaned_data


    # Customizes form validation for the username field.
    def clean_username(self):
        # Confirms that the username is not already present in the
        # User model database.
        username = self.cleaned_data.get('username')
        user = []
        try:
            user = User.objects.get(username=username)
        except ObjectDoesNotExist:
            user = []
        if user :
            raise forms.ValidationError("Username is already taken.")
        
        return username

    def clean_email(self):
        # Confirms that the username is not already present in the
        # User model database.
        email = self.cleaned_data.get('email')
        user = []
        try:
            user = User.objects.get(email=email)
        except ObjectDoesNotExist:
            user = []
        if user :
            raise forms.ValidationError("This email is already registered.")
        
        return email

class EditForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        exclude = {
            'user',
            'img_url',
        }
        widgets = {
            'bio':forms.Textarea,
        }

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        exclude = {
            'user',
            'time',
            'comments',
            'follow',
            'postuser',
        }
        widgets = {
            'content':forms.Textarea,
        }
    def clean(self):
        # Calls our parent (forms.Form) .clean function, gets a dictionary
        # of cleaned data as a result
        cleaned_data = super(PostForm, self).clean()

        # We must return the cleaned data we got from our parent.
        return cleaned_data

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        exclude = {
            'user',
            'comments',
            'follow',
            'postuser',
        }
        widgets = {
            'content':forms.Textarea,
        }
    def clean(self):
        # Calls our parent (forms.Form) .clean function, gets a dictionary
        # of cleaned data as a result
        cleaned_data = super(CommentForm, self).clean()

        # We must return the cleaned data we got from our parent.
        return cleaned_data
        

class ChangeImageForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        exclude = (
            'age',
            'bio',
            'user',
            'follow',
            'picture',
            'img_url',

        )
    picture = forms.FileField(required=False)

    def clean_picture(self):
        picture = self.cleaned_data['picture']
        if not picture:
            return None
        # if image.size > MAX_UPLOAD_SIZE:
        #     raise forms.ValidationError('File too big (max size is {0} bytes)'.format(MAX_UPLOAD_SIZE))
        return picture

# class NewsForm(forms.ModelForm):
#     content = forms.CharField(widget=CKEditorWidget())
#     fields = (
#         'title',
#         'content',
#         )
#     exclude = (
#             'time',
#         )
#     class Meta:
#         model = News
#     def clean(self):
#         # Calls our parent (forms.Form) .clean function, gets a dictionary
#         # of cleaned data as a result
#         cleaned_data = super(NewsForm, self).clean()

#         # We must return the cleaned data we got from our parent.
#         return cleaned_data

