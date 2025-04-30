# users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    is_student = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)

    def __str__(self):
        return self.username















# from django.contrib.auth.models import AbstractUser
# from django.db import models

# class CustomUser(AbstractUser):
#     is_student = models.BooleanField(default=False)
#     is_admin = models.BooleanField(default=False)

#     # Additional fields
#     date_of_birth = models.DateField(null=True, blank=True)
#     gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], blank=True)
#     phone = models.CharField(max_length=15, blank=True)
#     course_or_class = models.CharField(max_length=100, blank=True)
#     profile_photo = models.ImageField(upload_to='profile_photos/', null=True, blank=True)

#     def __str__(self):
#         return self.username
