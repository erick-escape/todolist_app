from django.contrib import admin
from .models import Attachment

# Register your models here.

class AttachmentAdmin(admin.ModelAdmin):
    list_display = [
        "task_id",
        "file",
        "created_at",
        "updated_at",
    ]


admin.site.register(Attachment, AttachmentAdmin)