#!/bin/bash

# Academic Scheduler Kubernetes Deployment Script
# Usage: ./deploy.sh [environment] [namespace]
# Example: ./deploy.sh production academic-scheduler

set -e

ENVIRONMENT=${1:-development}
NAMESPACE=${2:-default}
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
K8S_DIR="$(dirname "$SCRIPT_DIR")"

echo "========================================="
echo "Academic Scheduler K8s Deployment"
echo "========================================="
echo "Environment: $ENVIRONMENT"
echo "Namespace: $NAMESPACE"
echo "K8s Directory: $K8S_DIR"
echo "========================================="

# Check if kubectl is installed
if ! command -v kubectl &> /dev/null; then
    echo "❌ kubectl is not installed. Please install kubectl first."
    exit 1
fi

# Check if cluster is accessible
if ! kubectl cluster-info &> /dev/null; then
    echo "❌ Cannot connect to Kubernetes cluster. Please check your kubeconfig."
    exit 1
fi

echo "✅ Connected to Kubernetes cluster"

# Create namespace if it doesn't exist
if ! kubectl get namespace $NAMESPACE &> /dev/null; then
    echo "📦 Creating namespace: $NAMESPACE"
    kubectl create namespace $NAMESPACE
else
    echo "✅ Namespace $NAMESPACE already exists"
fi

# Set current context to namespace
kubectl config set-context --current --namespace=$NAMESPACE

# Apply secrets first (if they exist)
echo ""
echo "🔐 Applying secrets..."
if [ -f "$K8S_DIR/secrets/database-secrets.yaml" ]; then
    kubectl apply -f "$K8S_DIR/secrets/database-secrets.yaml" -n $NAMESPACE
    echo "✅ Secrets applied"
else
    echo "⚠️  Warning: No secrets file found. Please create secrets manually."
fi

# Apply base configurations
echo ""
echo "📝 Applying base configurations..."
if [ -d "$K8S_DIR/base" ]; then
    kubectl apply -k "$K8S_DIR/base" -n $NAMESPACE
    echo "✅ Base configurations applied"
fi

# Apply infrastructure components
echo ""
echo "🏗️  Deploying infrastructure components..."
for component in redis postgres; do
    if [ -d "$K8S_DIR/infrastructure/$component" ]; then
        echo "  - Deploying $component..."
        kubectl apply -f "$K8S_DIR/infrastructure/$component/" -n $NAMESPACE
    fi
done

echo "⏳ Waiting for infrastructure to be ready..."
kubectl wait --for=condition=ready pod -l tier=cache --timeout=120s -n $NAMESPACE || true
kubectl wait --for=condition=ready pod -l tier=database --timeout=120s -n $NAMESPACE || true

# Apply monitoring stack
echo ""
echo "📊 Deploying monitoring stack..."
for monitor in prometheus grafana; do
    if [ -d "$K8S_DIR/monitoring/$monitor" ]; then
        echo "  - Deploying $monitor..."
        kubectl apply -f "$K8S_DIR/monitoring/$monitor/" -n $NAMESPACE
    fi
done

# Apply microservices
echo ""
echo "🚀 Deploying microservices..."
for service in conflictmanager schedulevotingmanager usermanager coursemanager schedulemanager frontend; do
    if [ -d "$K8S_DIR/services/$service" ]; then
        echo "  - Deploying $service..."
        kubectl apply -f "$K8S_DIR/services/$service/" -n $NAMESPACE
    fi
done

# Apply environment-specific overlays
echo ""
echo "🎯 Applying $ENVIRONMENT environment configurations..."
if [ -d "$K8S_DIR/overlays/$ENVIRONMENT" ]; then
    kubectl apply -k "$K8S_DIR/overlays/$ENVIRONMENT" -n $NAMESPACE
    echo "✅ Environment configurations applied"
else
    echo "⚠️  Warning: No overlay found for environment: $ENVIRONMENT"
fi

# Wait for deployments to be ready
echo ""
echo "⏳ Waiting for deployments to be ready..."
kubectl wait --for=condition=available deployment --all --timeout=300s -n $NAMESPACE || true

# Display deployment status
echo ""
echo "========================================="
echo "📊 Deployment Status"
echo "========================================="
kubectl get pods -n $NAMESPACE
echo ""
kubectl get svc -n $NAMESPACE

echo ""
echo "========================================="
echo "✅ Deployment Complete!"
echo "========================================="
echo ""
echo "📝 Next steps:"
echo "  1. Check pod status: kubectl get pods -n $NAMESPACE"
echo "  2. View logs: kubectl logs -f <pod-name> -n $NAMESPACE"
echo "  3. Access services:"
echo "     - Frontend: kubectl port-forward svc/frontend 5173:5173 -n $NAMESPACE"
echo "     - Prometheus: kubectl port-forward svc/prometheus 9090:9090 -n $NAMESPACE"
echo "     - Grafana: kubectl port-forward svc/grafana 3000:3000 -n $NAMESPACE"
echo ""
