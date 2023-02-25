import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import HttpResponse, HttpResponseRedirect, render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

from .models import *


def index(request):

    # Authenticated users view their inbox
    if request.user.is_authenticated:
        return render(request, "core.html")

    # Everyone else is prompted to sign in
    else:
        return HttpResponseRedirect(reverse("login"))

@csrf_exempt
@login_required
def data(request):
    
    try:
        data = Data.objects.get(user=request.user)
    except Data.DoesNotExist:
        data = Data()
        data.user = request.user
        data.balance = 0
        data.basicgpu = 0
        data.advancedgpu = 0
        data.ultimategpu = 0
        data.lifetimeearning = 0
        data.lifetimespent = 0
        data.buttonclicks = 0
        data.save()
        return JsonResponse(data.serialize(), safe=False)

    if request.method == "GET":
        return JsonResponse(data.serialize(), safe=False)
    elif request.method == "PUT":
        new_data = json.loads(request.body)
        data.balance = new_data["balance"]
        data.basicgpu = new_data["basicgpu"]
        data.advancedgpu = new_data["advancedgpu"]
        data.ultimategpu = new_data["ultimategpu"]
        data.lifetimeearning = new_data["lifetimeearning"]
        data.lifetimespent = new_data["lifetimespent"]
        data.buttonclicks = new_data["buttonclicks"]
        data.save()
        return HttpResponse(status=204)



    

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        email = request.POST["email"]
        password = request.POST["password"]
        user = authenticate(request, username=email, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "login.html", {
                "message": "Invalid email and/or password."
            })
    else:
        return render(request, "login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "coreregister.html", {
                "message": "Passwords must match!"
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(email, email, password)
            user.save()
        except IntegrityError as e:
            print(e)
            return render(request, "register.html", {
                "message": "Email address already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "register.html")
