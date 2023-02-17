from celery import shared_task
from time import sleep
from content.models import Video

@shared_task
def upload_video(video_id):
    video = Video.objects.get(id=video_id)
    # Simulate upload progress
    for i in range(1, 11):
        sleep(1)
        video.progress = i * 10
        video.save()
    video.progress = 100
    video.save()