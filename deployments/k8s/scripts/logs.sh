#!/bin/bash

# Academic Scheduler Kubernetes Logs Script
# Usage: ./logs.sh [service-name] [namespace] [options]
# Example: ./logs.sh usermanager academic-scheduler -f

set -e

SERVICE=${1}
NAMESPACE=${2:-default}
shift 2 || true
OPTIONS="$@"

echo "========================================="
echo "Academic Scheduler K8s Logs"
echo "========================================="

if [ -z "$SERVICE" ]; then
    echo "Usage: ./logs.sh [service-name] [namespace] [options]"
    echo ""
    echo "Available services:"
    echo "  - conflictmanager"
    echo "  - schedulevotingmanager"
    echo "  - usermanager"
    echo "  - coursemanager"
    echo "  - schedulemanager"
    echo "  - frontend"
    echo "  - prometheus"
    echo "  - grafana"
    echo "  - redis"
    echo "  - postgres"
    echo ""
    echo "Options:"
    echo "  -f, --follow        Follow log output"
    echo "  --tail=N            Show last N lines (default: 100)"
    echo "  --previous          Show logs from previous container"
    echo "  --since=TIME        Show logs since time (e.g., 5m, 1h)"
    exit 1
fi

echo "Service: $SERVICE"
echo "Namespace: $NAMESPACE"
echo "Options: ${OPTIONS:-none}"
echo "========================================="
echo ""

# Get pods for the service
PODS=$(kubectl get pods -n $NAMESPACE -l app=$SERVICE -o jsonpath='{.items[*].metadata.name}')

if [ -z "$PODS" ]; then
    echo "❌ Error: No pods found for service $SERVICE in namespace $NAMESPACE"
    exit 1
fi

# Count pods
POD_COUNT=$(echo $PODS | wc -w | tr -d ' ')

if [ $POD_COUNT -eq 1 ]; then
    # Single pod - show logs directly
    echo "📋 Showing logs for $PODS"
    echo ""
    kubectl logs $PODS -n $NAMESPACE ${OPTIONS:---tail=100}
else
    # Multiple pods - show logs from all
    echo "📋 Found $POD_COUNT pods for $SERVICE"
    echo ""
    
    if [[ $OPTIONS == *"-f"* ]] || [[ $OPTIONS == *"--follow"* ]]; then
        # For follow mode, use stern if available, otherwise warn
        if command -v stern &> /dev/null; then
            stern $SERVICE -n $NAMESPACE ${OPTIONS}
        else
            echo "⚠️  Multiple pods detected. Install 'stern' for better log following:"
            echo "   brew install stern (macOS)"
            echo "   or https://github.com/stern/stern"
            echo ""
            echo "Showing logs from first pod only..."
            FIRST_POD=$(echo $PODS | awk '{print $1}')
            kubectl logs $FIRST_POD -n $NAMESPACE ${OPTIONS}
        fi
    else
        # For non-follow mode, show logs from all pods
        for POD in $PODS; do
            echo "========================================="
            echo "Pod: $POD"
            echo "========================================="
            kubectl logs $POD -n $NAMESPACE ${OPTIONS:---tail=50}
            echo ""
        done
    fi
fi
