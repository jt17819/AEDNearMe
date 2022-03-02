from django.urls import path

from .views import RegisterView, get_by_username, LogoutView

from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

urlpatterns = [
    path('register/', RegisterView.as_view(), name="register"),
    path('get_by_username/<str:username>/', get_by_username, name="get_by_username"),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name="logout"),
]