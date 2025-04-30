# student_management/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('urlbackend.urls')),
    path('api/users/', include('urlbackend.urls')),

]




# from django.conf import settings
# from django.conf.urls.static import static

# urlpatterns = [
#     # your other URLs
# ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
