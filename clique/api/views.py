from rest_framework import views
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from .serializers import LoginSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from accounts.models import Account
from .serializers import RegisterSerializer, VideoSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from content.models import Video
from rest_framework.generics import CreateAPIView, ListAPIView
import os
from django.core.files.storage import default_storage
import boto3
from botocore.exceptions import ClientError
import logging
from content.tasks import upload_file


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
        # Get file chunk
        file = request.data.get('file')
        title = request.data.get('title')
        description = request.data.get('description')
        file_name = request.data.get('file_name')
        chunk = int(request.data.get('chunk'))
        chunk_no = int(request.data.get('chunk'))
        total_chunks = int(request.data.get('total_chunks'))
        total_no_chunks = int(request.data.get('total_chunks'))

        # Create upload directory if it does not exist
        upload_dir = os.path.join(settings.MEDIA_ROOT, 'videos')
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)

        # Write chunk to file
        chunk_file_path = os.path.join(upload_dir, f'{file_name}.part{chunk}')
        with open(chunk_file_path, 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)

        # Check if all chunks have been uploaded
        if chunk_no == total_no_chunks:
            # Combine chunks into final file
            final_file_path = os.path.join(upload_dir, file_name)
            with open(final_file_path, 'wb') as final_file:
                for i in range(1, total_chunks+1):
                    chunk_file_path = os.path.join(upload_dir, f'{file_name}.part{i}')
                    with open(chunk_file_path, 'rb') as chunk_file:
                      final_file.write(chunk_file.read())
                    os.remove(chunk_file_path)

    # Upload merged file to S3
            s3_key = f'media/videos/{file_name}'
            print(final_file_path)
            print(s3_key)
            upload_file.delay(file_name=final_file_path, bucket=settings.AWS_STORAGE_BUCKET_NAME, object_name=s3_key)

    # Get the public URL of the file on S3
            s3_file_url = f'https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/{s3_key}'
            print("1")


    # Deserialize and validate data with the serializer
            video_data = {'title': title, 'description': description,
               'file': s3_file_url} # You can include other fields as well
            serializer = VideoSerializer(data=video_data)
            serializer.is_valid(raise_exception=True)

    # Save the Video instance with the S3 URL
            serializer.save()
            

            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_200_OK)
    
class VideoList(ListAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer