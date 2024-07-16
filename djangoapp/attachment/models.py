from django.db import models

# Create your models here.
class Attachment(models.Model):
    task_id = models.ForeignKey('task.Task', on_delete=models.CASCADE)
    file = models.FileField(upload_to='attachments/', max_length=250, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.file.name