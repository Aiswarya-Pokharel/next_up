from rest_framework import generics, permissions
from .models import Task
from .serializers import TaskSerializer
import json
from datetime import timedelta
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from groq import Groq
from django.conf import settings

class TaskListCreateView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_task_suggestion(request):
    title = request.data.get('title', '').strip()
    if not title:
        return Response({"detail": "Title is required."}, status=400)

    if not settings.GROQ_API_KEY:
        return Response({"detail": "AI service is not configured."}, status=503)

    client = Groq(api_key=settings.GROQ_API_KEY)
    now = timezone.now()
    tomorrow_start = (now + timedelta(days=1)).replace(hour=0, minute=0, second=0, microsecond=0)

    prompt = f"""You are a task planning assistant. Given a task title, suggest:
1. A concise 1-2 sentence description of what completing this task involves.
2. A reasonable priority: High, Medium, or Low.
3. A reasonable deadline as an ISO 8601 datetime. The deadline must be on or after {tomorrow_start.isoformat()} (tomorrow) — never today.

Task title: "{title}"

Respond ONLY with valid JSON, no markdown, no explanation:
{{"description": "...", "priority": "High|Medium|Low", "due_date": "YYYY-MM-DDTHH:MM:SS"}}"""

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.4,
            max_tokens=300,
        )
        raw = completion.choices[0].message.content.strip()
        raw = raw.replace("```json", "").replace("```", "").strip()
        suggestion = json.loads(raw)

        due_date = suggestion.get("due_date")
        parsed = None
        if due_date:
            from django.utils.dateparse import parse_datetime
            parsed = parse_datetime(due_date)
            if parsed and timezone.is_naive(parsed):
                parsed = timezone.make_aware(parsed)

        # Enforce tomorrow-or-later no matter what the AI returned
        if not parsed or parsed < tomorrow_start:
            parsed = tomorrow_start

        suggestion["due_date"] = parsed.isoformat()
        return Response(suggestion)
    except Exception as e:
        return Response({"detail": f"AI generation failed: {str(e)}"}, status=500)


from .services.kaggle_habits import get_habit_presets

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def habit_presets(request):
    try:
        data = get_habit_presets()
        return Response(data)
    except Exception as e:
        return Response({"detail": f"Could not load habit presets: {str(e)}"}, status=500)
    

# tasks/views.py
from datetime import timedelta

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def task_notifications(request):
    now = timezone.now()
    soon = now + timedelta(hours=24)

    overdue = Task.objects.filter(
        user=request.user,
        due_date__lt=now,
        is_completed=False,
        is_habit=False,
    ).order_by('due_date')

    upcoming = Task.objects.filter(
        user=request.user,
        due_date__range=(now, soon),
        is_completed=False,
        is_habit=False,
    ).order_by('due_date')

    def serialize(task, kind):
        return {
            "id": task.id,
            "title": task.title,
            "due_date": task.due_date.isoformat(),
            "type": kind,  
        }

    notifications = (
        [serialize(t, "overdue") for t in overdue] +
        [serialize(t, "upcoming") for t in upcoming]
    )

    return Response({
        "count": len(notifications),
        "notifications": notifications,
    })