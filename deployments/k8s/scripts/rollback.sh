#!/bin/bash

# Academic Scheduler Kubernetes Rollback Script
# Usage: ./rollback.sh [service-name] [namespace]
# Example: ./rollback.sh usermanager academic-scheduler

set -e

SERVICE=${1}
NAMESPACE=${2:-default}

echo "========================================="
echo "Academic Scheduler K8s Rollback"
echo "========================================="

if [ -z "$SERVICE" ]; then
    echo "Usage: ./rollback.sh [service-name] [namespace]"
    echo ""
    echo "Available services:"
    echo "  - conflictmanager"
    echo "  - schedulevotingmanager"
    echo "  - usermanager"
    echo "  - coursemanager"
    echo "  - schedulemanager"
    echo "  - frontend"
    echo "  - all (rollback all services)"
    exit 1
fi

echo "Service: $SERVICE"
echo "Namespace: $NAMESPACE"
echo "========================================="

# Function to rollback a single service
rollback_service() {
    local service_name=$1
    echo "🔄 Rolling back $service_name..."
    
    if kubectl get deployment $service_name -n $NAMESPACE &> /dev/null; then
        kubectl rollout undo deployment/$service_name -n $NAMESPACE
        echo "✅ $service_name rollback initiated"
        
        # Wait for rollback to complete
        kubectl rollout status deployment/$service_name -n $NAMESPACE --timeout=120s
        echo "✅ $service_name rollback completed"
    else
        echo "⚠️  Warning: Deployment $service_name not found"
    fi
}

# Rollback logic
if [ "$SERVICE" == "all" ]; then
    echo "🔄 Rolling back all services..."
    for svc in conflictmanager schedulevotingmanager usermanager coursemanager schedulemanager frontend; do
        rollback_service $svc
        echo ""
    done
else
    rollback_service $SERVICE
fi

echo ""
echo "========================================="
echo "📊 Current Status"
echo "========================================="
kubectl get pods -n $NAMESPACE

echo ""
echo "✅ Rollback complete!"
