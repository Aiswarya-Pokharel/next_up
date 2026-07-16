FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD echo "DOCKERFILE CMD IS RUNNING" && python manage.py migrate --noinput && gunicorn task_smarter.wsgi --bind 0.0.0.0:8080 --timeout 120 --log-level debug --access-logfile - --error-logfile -