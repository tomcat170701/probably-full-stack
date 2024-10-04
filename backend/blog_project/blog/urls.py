from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import PostList, PostDetail, RegisterUserView

urlpatterns = [
    path('posts/', PostList.as_view(), name='post-list'),  # Post list endpoint
    path('posts/<int:pk>/', PostDetail.as_view(), name='post-detail'),  # Post detail endpoint
    path('register/', RegisterUserView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Login endpoint
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Token refresh endpoint
]
