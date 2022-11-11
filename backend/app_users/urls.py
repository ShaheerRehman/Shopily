from django.urls import path
from . import views

urlpatterns = [
    path('', views.GetUsers.as_view(), name='users'),
    path('profile/', views.GetProfile.as_view(), name='profile'),
]
