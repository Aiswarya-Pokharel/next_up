from django.core.management.base import BaseCommand
from django.core.mail import send_mail
from django.utils import timezone
from datetime import timedelta
from groq import Groq
from django.conf import settings
from tasks.models import Task, HabitLog, Notification

LOOKBACK_DAYS = 7
CONSISTENCY_THRESHOLD = 0.6  # below 60% completion triggers a nudge

class Command(BaseCommand):
    help = "Weekly AI-generated nudges for inconsistent habits"

    def handle(self, *args, **options):
        if not settings.GROQ_API_KEY:
            self.stderr.write("GROQ_API_KEY not configured.")
            return

        client = Groq(api_key=settings.GROQ_API_KEY)
        today = timezone.localdate()
        window_start = today - timedelta(days=LOOKBACK_DAYS - 1)

        habits = Task.objects.filter(is_habit=True).select_related('user')
        nudges_sent = 0

        for habit in habits:
            completed_days = HabitLog.objects.filter(
                task=habit, scheduled_for__range=(window_start, today)
            ).count()
            rate = completed_days / LOOKBACK_DAYS

            if rate >= CONSISTENCY_THRESHOLD:
                continue  # doing fine, skip

            prompt = f"""You are a supportive habit coach focused on health and wellbeing.
A user has a daily habit called "{habit.title}" ({habit.description or "no description"}).
In the last {LOOKBACK_DAYS} days, they completed it {completed_days} out of {LOOKBACK_DAYS} times.

Write a short (2-3 sentence), warm, encouraging notification nudging them to get back on track.
Frame it around their wellbeing/health benefit of this habit, not guilt.
Do not use exclamation marks excessively. Respond with ONLY the message text, no quotes, no preamble."""

            try:
                completion = client.chat.completions.create(
                    model="llama-3.3-70b-versatile",
                    messages=[{"role": "user", "content": prompt}],
                    temperature=0.6,
                    max_tokens=120,
                )
                message = completion.choices[0].message.content.strip()
            except Exception as e:
                self.stderr.write(f"Groq generation failed for {habit.title}: {e}")
                continue

            Notification.objects.create(
                user=habit.user,
                task=habit,
                notification_type='habit_nudge',
                message=message,
            )

            if habit.user.email:
                try:
                    send_mail(
                        subject=f"A gentle nudge about '{habit.title}'",
                        message=message,
                        from_email=None,
                        recipient_list=[habit.user.email],
                    )
                except Exception as e:
                    self.stderr.write(f"Email failed for {habit.user.email}: {e}")

            nudges_sent += 1

        self.stdout.write(self.style.SUCCESS(f"Sent {nudges_sent} habit nudge(s)"))