# Generated by Django 3.1.2 on 2020-11-01 10:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20201101_1546'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accountdetail',
            name='photo',
            field=models.FileField(blank=True, null=True, upload_to='students_images'),
        ),
    ]