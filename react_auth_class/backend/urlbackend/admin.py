from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin


User = get_user_model()
# Optionally customize UserAdmin as needed
admin.site.register(User, UserAdmin)
