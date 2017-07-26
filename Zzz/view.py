# -*- coding: utf-8 -*-

# from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth import authenticate
from django.contrib.auth.models import User


def base(request):
    return render(request, 'base.html')


def signin(request):
    if request.method == 'POST':
        usrname = request.POST['signin_username']
        passwd = request.POST['signin_password']
        user = authenticate(username=usrname, password=passwd)
        print usrname, passwd
        context = {'rlt': 'Hello World!'}
        error = {'err': '用户名或密码不正确！'}
        if user is not None:
            return render(request, 'post.html', context)
        else:
            return render(request, 'index.html', error)
    else:
        return render(request, 'index.html')


def register(request):
    if request.method == 'POST':
        usrname = request.POST['register_username']
        passwd = request.POST['register_password_1']
        email = request.POST['register_email']
        user = User.objects.create_user(usrname, email, passwd)
        if user is not None:
            context = {'rlt': '创建用户成功！'}
            print 1111111
            return render(request, 'register.html', context)
        else:
            error = {'err': '创建用户失败，请重新尝试！'}
            print 2222222
            return render(request, 'register.html', error)
    else:
        print 33333333
        return render(request, 'register.html')
