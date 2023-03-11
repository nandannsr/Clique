from django.urls import path
from .views import *
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),

    path('register/', RegisterView.as_view(), name='register'),
    path('update/', UserUpdateView.as_view(), name='update'),
     
    path('upload/',VideoUploadView.as_view(), name='upload'), # For video uploading
    path('videos/',VideoList.as_view(), name='video_list'), #For sending video list to the front end
    path('genres/',GenreList.as_view(), name='genre_list'), #For fetching genre list
    path('search', SearchVideoList.as_view(), name='search'),

    #Admin Panel Urls
    path('dashboard',AdminHomeView.as_view(), name='dashboard')
]