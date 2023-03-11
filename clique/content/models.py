from datetime import datetime
from django.db import models
from accounts.models import Account

# Create your models here.
class Genre(models.Model):
    genre_name = models.CharField(max_length=50,unique=True)

    def __str__(self):
        return self.genre_name
    
class Video(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    file = models.URLField(max_length=200, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    progress = models.IntegerField(default=0)
    genres = models.ManyToManyField(Genre)
    

    def __str__(self):
        return self.title
