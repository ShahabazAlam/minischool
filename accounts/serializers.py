from django.contrib.auth import authenticate
from .models import User
from api.models import AccountDetail
from rest_framework import serializers
from .models import User

# User serializer


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'role')


# User register serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'role', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        if User.objects.filter(username=validated_data['username']).exists():
            raise serializers.ValidationError('already exists')
        else:
            user = super(RegisterSerializer, self).create(validated_data)
            user.set_password(validated_data['password'])
            user.save()
            AccountDetail.objects.create(user=user)
            return user


# User login serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    role = serializers.CharField()

    def validate(self, data):
        user = User.objects.filter(
            username=data['username'], role=data['role'])
        if user.exists():
            user = authenticate(**data)
            if user is not None:
                if user and user.is_active:
                    return user
            else:
                raise serializers.ValidationError("Incorrect Credentials")
        raise serializers.ValidationError("User Not Found")
