# Generated by Django 4.1.5 on 2023-02-17 15:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0005_alter_video_file'),
    ]

    operations = [
        migrations.AlterField(
            model_name='video',
            name='file',
            field=models.CharField(max_length=200),
        ),
    ]
