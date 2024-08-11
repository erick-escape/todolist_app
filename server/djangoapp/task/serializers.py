from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'done', 'created_at', 'updated_at', 'user']
        read_only_fields = ['user']  # Torna o campo 'user' somente leitura

    def create(self, validated_data):
        # Obtenha o usuário autenticado do contexto
        user = self.context['request'].user
        # Crie a tarefa sem o campo 'user'
        task = Task(**validated_data)
        # Defina o campo 'user'
        task.user = user
        task.save()
        return task
