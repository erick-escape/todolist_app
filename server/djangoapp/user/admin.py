from django.contrib import admin
from .models import User

class UserAdmin(admin.ModelAdmin):
    list_display = [
        "first_name",
        "last_name",
        "is_active",
        "date_joined",
        "username",
        "email",
        "is_admin",
        "created_at",
        "updated_at",
    ]

admin.site.register(User, UserAdmin)
