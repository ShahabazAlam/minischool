# Generated by Django 3.1.2 on 2020-11-01 09:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20201101_1409'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accountdetail',
            name='dob',
            field=models.DateField(blank=True, null=True),
        ),
    ]
