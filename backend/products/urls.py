from django.urls import path
from . import views

urlpatterns = [
    # path('', views.GetRoutes.as_view(), name='routes'),
    path('', views.GetProducts.as_view(), name='products'),
    path('<str:pk>/', views.GetProduct.as_view(), name='product'),
]
