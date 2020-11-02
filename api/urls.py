from django.urls import path
from knox.views import LogoutView
from .views import FetchUsersAPIView, AddDetailView, FetchUserAPIView, DeleteUserAPIView
urlpatterns = [
    path('fetch-users/<str:slug>', FetchUsersAPIView.as_view()),
    path('add-detail/', AddDetailView.as_view()),
    path('fetch-user/<int:id>/', FetchUserAPIView.as_view()),
    path('delete-user/<int:id>/', DeleteUserAPIView.as_view()),
]
