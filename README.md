# Quick Start #
```
#!python
Clone to your local
#Install Django (Currently implemented on Django 1.8.2)
pip install Django
#Install necessary tools
pip install django-guardian
pip install django-easy-timezones
pip install django-ckeditor
pip install tzlocal
#start server 
python manage.py runserver
# Go to localhost:8000
# if error. install any tool as error shows.
```
# COMMIT GUIDELINE #
### 1. Checkout to your (new) branch ###
git checkout -b {{branch_name}}
### 2.Commit to your local ###
**2.1 commit message:**
```
See #{{issue number}}  {{description}}

{{details}}
```
example:
```
See #1 index page responsive design

Have added designs for phone and tablet
```
### 3.Pull from master ###
```
git pull origin master
```
### 4. Push to remote branch ###
```
git push origin {{branch_name}}
```
### 5. Create pull request ###
**5.1 Create a pull request for this branch to master**

**5.2 Assign this issue to Mao Tang**