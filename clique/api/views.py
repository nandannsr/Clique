from rest_framework import views
import jwt
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from .serializers import LoginSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from accounts.models import Account
from .serializers import RegisterSerializer, VideoSerializer, GenreSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from content.models import Video, Genre
from rest_framework.generics import CreateAPIView, ListAPIView, UpdateAPIView
import os
from django.core.files.storage import default_storage
import boto3
from botocore.exceptions import ClientError
import logging
from content.tasks import upload_file
from rest_framework import filters
from google.oauth2 import id_token
from google.auth.transport import requests
from api.permissions import IsSuperuser


# Login Class with JWT
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = LoginSerializer


class LogoutView(views.APIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        refresh_token = request.data.get("refresh")
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Registration Class
class RegisterView(views.APIView):
    

    def post(self, request, format=None):
        print(request.data)
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Video Upload
class VideoUploadView(CreateAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer

    def create(self, request, *args, **kwargs):
        print(request.data)
        genres = request.data.get('genres')
        if isinstance(genres, str):
             genres = [genres]
        request.data['genres'] = genres
        print(request.data)
        return super().create(request, *args, **kwargs)

    
class VideoList(ListAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer

class GenreList(ListAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

class UserUpdateView(UpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get_serializer(self, *args, **kwargs):
        kwargs['partial'] = True
        return super().get_serializer(*args, **kwargs)
        
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)
    
class SearchVideoList(ListAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'description', 'genres__genre_name']


class AdminHomeView(APIView):
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated, IsSuperuser)
    def get(self, request):
        
        try:
            user_count = Account.objects.count()
            video_count = Video.objects.count()
            return Response({'user_count': user_count,
                            'video_count':video_count }, status=status.HTTP_200_OK)
        except:
            return Response({'error': 'Could not retrieve user count'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



     
