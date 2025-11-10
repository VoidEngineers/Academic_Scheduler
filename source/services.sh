#!/bin/bash

# Academic Scheduler - Microservices Startup Script
# This script helps you start and manage the microservices architecture

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}Academic Scheduler - Microservices${NC}"
echo -e "${GREEN}======================================${NC}"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}Error: Docker is not running. Please start Docker and try again.${NC}"
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Error: docker-compose is not installed.${NC}"
    exit 1
fi

# Change to deployments directory (go up one level from source)
cd "$(dirname "$0")/../deployments"

case "$1" in
    start)
        echo -e "${GREEN}Starting all microservices...${NC}"
        docker-compose up -d
        echo ""
        echo -e "${GREEN}Waiting for services to be healthy...${NC}"
        sleep 10
        echo ""
        echo -e "${GREEN}Services started successfully!${NC}"
        echo ""
        echo -e "${YELLOW}Access Points:${NC}"
        echo "  Frontend:  http://localhost"
        echo "  Grafana:   http://localhost:3000 (admin/admin)"
        echo "  SonarQube: http://localhost:9000"
        echo ""
        ;;
    
    stop)
        echo -e "${YELLOW}Stopping all microservices...${NC}"
        docker-compose down
        echo -e "${GREEN}All services stopped.${NC}"
        ;;
    
    restart)
        echo -e "${YELLOW}Restarting all microservices...${NC}"
        docker-compose restart
        echo -e "${GREEN}All services restarted.${NC}"
        ;;
    
    status)
        echo -e "${GREEN}Service Status:${NC}"
        docker-compose ps
        ;;
    
    logs)
        if [ -z "$2" ]; then
            docker-compose logs -f
        else
            docker-compose logs -f "$2"
        fi
        ;;
    
    build)
        echo -e "${GREEN}Building all services...${NC}"
        docker-compose build
        echo -e "${GREEN}Build completed.${NC}"
        ;;
    
    clean)
        echo -e "${YELLOW}Stopping and removing all containers, networks, and volumes...${NC}"
        docker-compose down -v
        echo -e "${GREEN}Cleanup completed.${NC}"
        ;;
    
    health)
        echo -e "${GREEN}Checking service health...${NC}"
        echo ""
        
        services=("usermanager:8082" "coursemanager:8082" "schedulemanager:8083" "conflictmanager:5000" "schedulevotingmanager:5000")
        
        for service in "${services[@]}"; do
            name="${service%%:*}"
            port="${service##*:}"
            
            if docker-compose ps | grep -q "$name.*Up"; then
                echo -e "${GREEN}✓${NC} $name is running"
            else
                echo -e "${RED}✗${NC} $name is not running"
            fi
        done
        ;;
    
    *)
        echo "Usage: $0 {start|stop|restart|status|logs|build|clean|health}"
        echo ""
        echo "Commands:"
        echo "  start    - Start all microservices"
        echo "  stop     - Stop all microservices"
        echo "  restart  - Restart all microservices"
        echo "  status   - Show service status"
        echo "  logs     - Show logs (use: $0 logs [service-name])"
        echo "  build    - Build all Docker images"
        echo "  clean    - Stop and remove all containers and volumes"
        echo "  health   - Check health of all services"
        echo ""
        exit 1
        ;;
esac

exit 0
