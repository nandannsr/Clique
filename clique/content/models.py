from datetime import datetime
from django.db import models
from accounts.models import Account

# Create your models here.
class Video(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    file = models.URLField(max_length=200, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    progress = models.IntegerField(default=0)

    def __str__(self):
        return self.title

class Picture(models.Model):
    title = models.CharField(max_length=30)
    picture = models.FileField(upload_to='pictures/')