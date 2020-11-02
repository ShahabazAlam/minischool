from rest_framework import serializers
from .models import AccountDetail
from accounts.serializers import UserSerializer

# User deatil serializer


class DetailSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = AccountDetail
        fields = '__all__'

    def get_user(self, obj):
        return UserSerializer(obj.user).data
