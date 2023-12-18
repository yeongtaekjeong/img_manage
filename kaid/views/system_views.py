from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth.models import User, Group, Permission
from django.http import FileResponse
from django.core.files.storage import FileSystemStorage
import os

#######################################################################################################################
# 1. MethodName : [1]index
# 2. Comment    : 인덱스 페이지
# 3. 작성자      : 전준영
# 4. 작성일      : 2023. 12. 18.
#######################################################################################################################
def index(request):
	return render(request, 'index.html')


#######################################################################################################################
# 1. MethodName : [3]alert
# 2. Comment    : 알럿창 처리
# 3. 작성자      : 전준영
# 4. 작성일      : 2023. 4. 5.
#######################################################################################################################
def alert(request):
	try:
		msg = request.GET['msg']
		link = request.GET['link']
	except (ZeroDivisionError, Exception) as e:
		return render(request, '404.html')

	if link == "404": return render(request, '404.html')
	if link == "500": return render(request, '500.html')
	return render(request, 'alert.html',{
			'msg': msg,
			'link': link
	})