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
from rest_framework.generics import CreateAPIView
import os


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
        file_name = "demo"
        chunk = int(request.data.get('chunk'))
        chunk_no = int(request.data.get('chunk'))
        total_chunks = int(request.data.get('total_chunks'))
        total_no_chunks = int(request.data.get('total_chunks'))
        print(total_chunks)
        print(chunk)

        # Create upload directory if it does not exist
        upload_dir = os.path.join(settings.MEDIA_ROOT, 'video_upload')
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
                 for i in range(1,total_chunks+1):
                    chunk_file_path = os.path.join(upload_dir, f'{file_name}.part{i}')
                    with open(chunk_file_path, 'rb') as chunk_file:
                        final_file.write(chunk_file.read())
                    os.remove(chunk_file_path)

            # Deserialize and validate data with the serializer
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            # Create new Video instance
            self.perform_create(serializer)

        return Response(status=status.HTTP_200_OK)
