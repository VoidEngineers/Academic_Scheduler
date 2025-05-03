FROM python:3.12-alpine

# Set the timezone to EST
ENV TZ="Asia/Kolkata"

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements-lock.txt .

RUN pip install --no-cache-dir -r requirements-lock.txt

COPY . /app

EXPOSE 5000

CMD ["gunicorn", "-c", "gunicorn.conf.py", "run:app"]
