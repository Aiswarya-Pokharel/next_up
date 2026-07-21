from django import views
from django.urls import path
from .views import TaskListCreateView, TaskDetailView, generate_task_suggestion, habit_presets , task_notifications  , habit_calendar, toggle_habit_completion, app_notifications, mark_notification_read    ,LatestHabitNudgeView     

urlpatterns = [
    path('', TaskListCreateView.as_view(), name='task-list'),
    path('<int:pk>/', TaskDetailView.as_view(), name='task-detail'),
    path('generate/', generate_task_suggestion, name='generate-task'),
    path('habit-presets/', habit_presets, name='habit-presets'),
    path('notifications/', task_notifications, name='task-notifications'),
    path('<int:pk>/toggle-habit/', toggle_habit_completion, name='toggle-habit'),
    path('<int:pk>/calendar/', habit_calendar, name='habit-calendar'),
    path('app-notifications/', app_notifications, name='app-notifications'),
    path('app-notifications/<int:pk>/read/', mark_notification_read, name='mark-notification-read'),
    path('tasks/<int:task_id>/latest-nudge/', LatestHabitNudgeView.as_view(), name='latest-habit-nudge'),
]