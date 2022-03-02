from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_all_defibs, name="get_all_defibs"),
    path('upload/', views.create_defib, name="create_defib")
]