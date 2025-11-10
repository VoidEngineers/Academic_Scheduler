FROM python:3.12-slim

# Set the timezone to EST
ENV TZ="Asia/Kolkata"

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements-lock.txt .

RUN pip install --no-cache-dir -r requirements-lock.txt

COPY . /app

EXPOSE 5000

CMD ["gunicorn", "-c", "gunicorn.conf.py", "run:app"]
