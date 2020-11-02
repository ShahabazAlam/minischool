from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models
import datetime


class User(AbstractUser):
    USER_TYPE_CHOICES = (
        ('S', 'Student'),
        ('T', 'Teacher'),
        ('A', 'Administrator'),
    )

    username = models.CharField(unique=True, blank=False, max_length=40,
                                error_messages={
                                    'unique': "A user with that username already exists.",
                                })
    role = models.CharField(choices=USER_TYPE_CHOICES, max_length=2)
    email = models.EmailField(null=True, blank=True,
                              error_messages={
                                  'unique': "A user with that email already exists.",
                              })
    REQUIRED_FIELDS = ['role']

    def __unicode__(self):
        return self.email
