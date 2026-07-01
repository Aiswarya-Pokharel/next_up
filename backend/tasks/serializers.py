from rest_framework import serializers
from .models import Task



class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'user', 'title', 'description', 'priority', 'priority_score', 'is_completed', 'created_at', 'updated_at']
        read_only_fields = ['user', 'priority_score', 'created_at', 'updated_at']