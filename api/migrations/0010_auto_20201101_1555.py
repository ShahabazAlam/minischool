# Generated by Django 3.1.2 on 2020-11-01 10:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_auto_20201101_1554'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accountdetail',
            name='dob',
            field=models.DateField(blank=True, default='MM-DD-YYYY', null=True),
        ),
    ]