# Generated by Django 4.1.5 on 2023-02-17 14:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0003_alter_video_file'),
    ]

    operations = [
        migrations.AlterField(
            model_name='video',
            name='file',
            field=models.FileField(upload_to='videos/'),
        ),
    ]