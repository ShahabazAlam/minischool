# Generated by Django 3.1.2 on 2020-11-01 10:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_auto_20201101_1553'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accountdetail',
            name='dob',
            field=models.DateField(blank=True, default='YYYY-MM-DD', null=True),
        ),
    ]
