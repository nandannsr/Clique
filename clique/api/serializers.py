from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.tokens import RefreshToken
from accounts.models import Account
from content.models import Video, Genre
from rest_framework.exceptions import ParseError



class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = ['first_name', 'last_name', 'email',]


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Account

        fields = ['id', 'username', 'first_name', 'last_name','phone_number',
                  'email', 'token',]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    
class LoginSerializer(TokenObtainPairSerializer):
   
   def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data

# Serializer for Registration
class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=Account.objects.all())]
            )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Account
        fields = ('password', 'password2', 'email', 'first_name', 'last_name', 'phone_number')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = Account.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            phone_number=validated_data['phone_number']
        )

        
        user.set_password(validated_data['password'])
        user.save()

        return user
    

#Video Upload Serializer
class VideoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Video
        fields = ['id', 'title', 'description', 'file', 'genres']

    def create(self, validated_data):
        genres = validated_data.pop('genres', [])
        print(genres)
        instance = super().create(validated_data)
        for g in genres:
            try:
                genre = Genre.objects.get(genre_name=g)
            except Genre.DoesNotExist:
                raise serializers.ValidationError(f'Genre "{g}" does not exist')
            instance.genres.add(genre)
        return instance
    
#Genre Serializer
class GenreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = ['id', 'genre_name']