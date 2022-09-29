from django.urls import path
from . import views

urlpatterns = [
    # path('', views.GetRoutes.as_view(), name='routes'),
    path('products/', views.GetProducts.as_view(), name='products'),
    path('product/<str:pk>/', views.GetProduct.as_view(), name='product'),
]
