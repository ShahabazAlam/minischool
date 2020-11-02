from django.db import models
from accounts.models import User
from django.core.validators import RegexValidator


class AccountDetail(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True, default=None)
    name = models.CharField(max_length=50, null=True, blank=True)
    fname = models.CharField(max_length=50, null=True, blank=True)
    standard = models.CharField(max_length=20, null=True, blank=True)
    gender = models.CharField(max_length=50, null=True, blank=True)
    address = models.CharField(max_length=80, null=True, blank=True)
    ID = models.CharField(max_length=20, null=True, blank=True)
    photo = models.ImageField()
    phone = models.CharField(max_length=15, null=True, blank=True)
    dob = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.name
