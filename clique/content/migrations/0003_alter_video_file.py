# Generated by Django 4.1.5 on 2023-02-17 14:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0002_rename_video_file_video_file_remove_video_user_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='video',
            name='file',
            field=models.URLField(),
        ),
    ]