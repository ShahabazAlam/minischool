from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from knox.models import AuthToken
from rest_framework.generics import (
    ListAPIView, RetrieveAPIView, CreateAPIView,
    UpdateAPIView, DestroyAPIView
)
from rest_framework.permissions import AllowAny, IsAuthenticated

from .serializers import DetailSerializer
from .models import AccountDetail
from rest_framework.exceptions import ParseError
from rest_framework.parsers import FileUploadParser
# Create your views here.
import os
from django.core.files.storage import FileSystemStorage
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from django.http import Http404
from accounts.models import User
from rest_framework import status


# Fetch user deatil serializer
class FetchUsersAPIView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = DetailSerializer

    def get_queryset(self):
        slug = self.kwargs['slug']
        return AccountDetail.objects.filter(user__role=slug)


# Add user deatil serializer
class AddDetailView(APIView):
    permission_classes = [AllowAny, ]
    parser_class = (FileUploadParser,)

    def post(self, request, format=None):
        user_id = request.data.get('u_id', None)
        dob = request.data.get('dob', None)
        photo = request.data.get('photo', None)
        name = request.data.get('name', None)
        fname = request.data.get('fname', None)
        phone = request.data.get('phone', None)
        gender = request.data.get('gender', None)
        address = request.data.get('address', None)
        standard = request.data.get('standard', None)
        ID = request.data.get('ID', None)
        email = request.data.get('email', None)

        if photo:
            if not os.path.exists('Files/media'):
                os.makedirs('Files/media')
            fs = FileSystemStorage("Files/media")
            filename = fs.save(photo.name, photo)  # save image to folder
        q_s = AccountDetail.objects.get(user_id=user_id)
        if name:
            q_s.name = name
        if fname:
            q_s.fname = fname
        if phone:
            q_s.phone = phone
        if gender:
            q_s.gender = gender
        if dob:
            q_s.dob = dob
        if photo:
            q_s.photo = filename
        if address:
            q_s.address = address
        if ID:
            q_s.ID = ID
        if standard:
            q_s.standard = standard
        if email:
            user = User.objects.get(id=user_id)
            user.email = email
            user.save()
        q_s.save()
        return Response({"message": 'Update Successfully'}, status=HTTP_200_OK)


# Fetch single user detail
class FetchUserAPIView(RetrieveAPIView):
    serializer_class = DetailSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        u_id = self.kwargs['id']
        try:
            user = AccountDetail.objects.get(user__id=u_id)
            return user
        except ObjectDoesNotExist:
            raise Http404("User Not Found")


# delete user
class DeleteUserAPIView(APIView):
    def delete(self, request, id, format=None):
        pk = request.data.get('id', None)
        user = User.objects.get(id=id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
