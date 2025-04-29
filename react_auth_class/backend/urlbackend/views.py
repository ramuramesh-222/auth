# users/views.py

from django.contrib.auth import authenticate
from rest_framework import generics, status, viewsets, permissions
from rest_framework.response import Response
from .serializers import UserSerializer, LoginSerializer, StudentSerializer
from .models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken


# REGISTER VIEW (open to anyone)
class RegisterUserView(generics.CreateAPIView):
    serializer_class = UserSerializer


# LOGIN VIEW (returns JWT token)
class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            # get token from serializer method
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ONLY ALLOW ADMIN USERS
class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_admin


# STUDENT CRUD FOR ADMIN
class StudentViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.filter(is_student=True)
    serializer_class = StudentSerializer
    permission_classes = [IsAdminUser]
