#!/bin/bash

# Academic Scheduler Kubernetes Scaling Script
# Usage: ./scale.sh [service-name] [replicas] [namespace]
# Example: ./scale.sh usermanager 3 academic-scheduler

set -e

SERVICE=${1}
REPLICAS=${2}
NAMESPACE=${3:-default}

echo "========================================="
echo "Academic Scheduler K8s Scaling"
echo "========================================="

if [ -z "$SERVICE" ] || [ -z "$REPLICAS" ]; then
    echo "Usage: ./scale.sh [service-name] [replicas] [namespace]"
    echo ""
    echo "Available services:"
    echo "  - conflictmanager"
    echo "  - schedulevotingmanager"
    echo "  - usermanager"
    echo "  - coursemanager"
    echo "  - schedulemanager"
    echo "  - frontend"
    exit 1
fi

echo "Service: $SERVICE"
echo "Replicas: $REPLICAS"
echo "Namespace: $NAMESPACE"
echo "========================================="

# Scale the deployment
echo "⚖️  Scaling $SERVICE to $REPLICAS replicas..."
if kubectl get deployment $SERVICE -n $NAMESPACE &> /dev/null; then
    kubectl scale deployment/$SERVICE --replicas=$REPLICAS -n $NAMESPACE
    echo "✅ Scaling command issued"
    
    # Wait for scaling to complete
    kubectl wait --for=condition=available deployment/$SERVICE --timeout=120s -n $NAMESPACE
    echo "✅ Scaling completed"
else
    echo "❌ Error: Deployment $SERVICE not found in namespace $NAMESPACE"
    exit 1
fi

echo ""
echo "========================================="
echo "📊 Current Status"
echo "========================================="
kubectl get deployment $SERVICE -n $NAMESPACE
echo ""
kubectl get pods -l app=$SERVICE -n $NAMESPACE

echo ""
echo "✅ Scaling complete!"
