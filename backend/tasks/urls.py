from django import views
from django.urls import path
from .views import TaskListCreateView, TaskDetailView, generate_task_suggestion, habit_presets , task_notifications           

urlpatterns = [
    path('', TaskListCreateView.as_view(), name='task-list'),
    path('<int:pk>/', TaskDetailView.as_view(), name='task-detail'),
path('generate/', generate_task_suggestion, name='generate-task'),
path('habit-presets/', habit_presets, name='habit-presets'),
# tasks/urls.py
path('notifications/', task_notifications, name='task-notifications'),
]