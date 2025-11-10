# Running Backend Locally with Docker

## Quick Start

### 1. Start All Services (One Command!)

```bash
./microservices.sh start
```

This will:
- Pull all required Docker images (first time only)
- Build your microservices
- Start all containers
- Set up networking

**First run takes 3-5 minutes to download images. Subsequent runs take ~30 seconds.**

### 2. Check Service Status

```bash
./microservices.sh status
```

You should see all services running:
- ✅ nginx-gateway
- ✅ usermanager
- ✅ coursemanager  
- ✅ schedulemanager
- ✅ conflictmanager
- ✅ schedulevotingmanager
- ✅ frontend
- ✅ redis
- ✅ prometheus
- ✅ grafana
- ✅ sonarqube
- ✅ sonar_db

### 3. Access Your Application

Once all services are running:

| Service | URL | Notes |
|---------|-----|-------|
| **Frontend** | http://localhost | Main application |
| **API Gateway** | http://localhost/health | Health check |
| **User API** | http://localhost/api/users | User management |
| **Course API** | http://localhost/api/courses | Course management |
| **Schedule API** | http://localhost/api/schedules | Schedule management |
| **Conflict API** | http://localhost/api/conflicts | Conflict detection |
| **Voting API** | http://localhost/api/voting | Schedule voting |
| **Grafana** | http://localhost:3000 | Monitoring (admin/admin) |

### 4. View Logs

```bash
# All services
./microservices.sh logs

# Specific service
./microservices.sh logs usermanager
./microservices.sh logs conflictmanager
./microservices.sh logs frontend
```

### 5. Check Health

```bash
./microservices.sh health
```

## Other Commands

### Stop All Services
```bash
./microservices.sh stop
```

### Restart Services
```bash
./microservices.sh restart
```

### Rebuild After Code Changes
```bash
./microservices.sh build
./microservices.sh restart
```

### Clean Everything (Remove containers & volumes)
```bash
./microservices.sh clean
```

## Individual Service Development

If you want to run a single service locally for development:

### Python Services (Flask)

#### Conflict Manager
```bash
cd source/conflictmanager

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements-lock.txt

# Run the service
python run.py
```

Runs on: http://localhost:5000

#### Schedule Voting Manager
```bash
cd source/schedulevotingmanager

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements-lock.txt

# Run the service
python run.py
```

Runs on: http://localhost:5000

### Java Services (Spring Boot)

#### User Manager
```bash
cd source/usermanager

# Using Maven wrapper
./mvnw spring-boot:run

# Or if you have Maven installed
mvn spring-boot:run
```

Runs on: http://localhost:8082

#### Course Manager
```bash
cd source/coursemanager
./mvnw spring-boot:run
```

Runs on: http://localhost:8082

#### Schedule Manager
```bash
cd source/schedulemanager
./mvnw spring-boot:run
```

Runs on: http://localhost:8083

### Frontend (React + Vite)

```bash
cd source/frontend

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Runs on: http://localhost:5173

## Troubleshooting

### Port Already in Use
```bash
# Check what's using port 80
lsof -i :80

# Kill the process
kill -9 <PID>
```

### Services Won't Start
```bash
# Check Docker is running
docker info

# View detailed logs
./microservices.sh logs [service-name]

# Restart specific service
cd deployments
docker-compose restart [service-name]
```

### MongoDB Connection Issues
Check the MongoDB URI in:
- `source/usermanager/src/main/resources/application.properties`
- `source/coursemanager/src/main/resources/application.properties`
- `source/schedulemanager/src/main/resources/application.properties`

### Clean Start (Nuclear Option)
```bash
# Stop everything
./microservices.sh clean

# Remove all Docker resources
docker system prune -a --volumes

# Start fresh
./microservices.sh start
```

## Development Workflow

### Making Code Changes

1. **Edit your code** in any service
2. **Rebuild that service**:
   ```bash
   cd deployments
   docker-compose build [service-name]
   docker-compose restart [service-name]
   ```
3. **Test the changes** via API Gateway

### Example: Update User Manager
```bash
# 1. Make changes to Java code in source/usermanager/

# 2. Rebuild and restart
cd deployments
docker-compose build usermanager
docker-compose restart usermanager

# 3. Test
curl http://localhost/api/users
```

### Hot Reload (Development Mode)

For faster development, run services individually:

1. **Stop Docker service you're working on**:
   ```bash
   cd deployments
   docker-compose stop usermanager
   ```

2. **Run it locally** with hot reload:
   ```bash
   cd source/usermanager
   ./mvnw spring-boot:run
   ```

3. **Access via localhost**:
   ```bash
   curl http://localhost:8082/api/users
   ```

## Database Access

### MongoDB (External)
Your services use MongoDB Atlas. Connection strings are in:
- Java: `application.properties`
- Python: Environment variables or config files

### Redis (Local)
```bash
# Connect to Redis CLI
docker exec -it redis redis-cli

# Common commands
PING
KEYS *
GET <key>
```

## Monitoring

### Prometheus Metrics
```bash
# User Manager metrics
curl http://localhost:8082/actuator/prometheus

# Course Manager metrics  
curl http://localhost:8082/actuator/prometheus

# Schedule Manager metrics
curl http://localhost:8083/actuator/prometheus
```

### Grafana Dashboards
1. Go to http://localhost:3000
2. Login: `admin` / `admin`
3. Add dashboards or import existing ones

## Testing APIs

### Using curl

```bash
# Health checks
curl http://localhost/health
curl http://localhost:8082/actuator/health
curl http://localhost:5000/health

# API calls (adjust as needed)
curl -X GET http://localhost/api/users
curl -X POST http://localhost/api/courses \
  -H "Content-Type: application/json" \
  -d '{"name":"Math 101","credits":3}'
```

### Using Postman/Insomnia
Import base URL: `http://localhost`

All APIs are accessible through the gateway with `/api/*` prefix.

## Next Steps

1. ✅ Start services: `./microservices.sh start`
2. ✅ Check status: `./microservices.sh status`
3. ✅ Test frontend: http://localhost
4. ✅ Test APIs: http://localhost/api/*
5. ✅ View monitoring: http://localhost:3000

## Support

If you encounter issues:
1. Check logs: `./microservices.sh logs [service-name]`
2. Verify health: `./microservices.sh health`
3. Review documentation: `docs/MICROSERVICES_ARCHITECTURE.md`
4. Contact team members in CODEOWNERS
