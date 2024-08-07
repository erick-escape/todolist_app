from django.urls import path
from . import views

urlpatterns = [
    path('', views.attachment_list),
    path('create/', views.attachment_create),
    path('<int:pk>/', views.attachment_detail),
]