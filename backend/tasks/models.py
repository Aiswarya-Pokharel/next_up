from django.db import models

class Task(models.Model):
    priority_choices = [
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
    ]
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    priority = models.CharField(max_length=50, choices=priority_choices, default='Medium')             
    priority_score = models.FloatField(null=True, blank=True)
    due_date = models.DateTimeField(null=True, blank=True)  
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-priority_score', 'due_date']

    def __str__(self):
      return self.title
    
    
