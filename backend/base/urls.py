from django.urls import path, include

urlpatterns = [
    path('users/', include('app_users.urls')),
    path('products/', include('products.urls')),
    path('product/', include('products.urls')),
    # path('orders/', include('orders.urls')),
]
