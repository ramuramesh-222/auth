# student_management/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('urlbackend.urls')),
    path('api/users/', include('urlbackend.urls')),

]
