from django.urls import path
from . import views

urlpatterns = [
    path('', views.user_list),
    path('create/', views.user_create),
    path('<int:pk>/', views.user_detail),
    path('me/', views.user_me),
]
