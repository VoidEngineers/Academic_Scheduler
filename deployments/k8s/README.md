# Kubernetes Deployment Guide# Kubernetes Deployment Guide



Complete guide for deploying the Academic Scheduler application to Kubernetes with environment-specific configurations.## Prerequisites



## 📁 Folder Structure1. **Kubernetes Cluster** (one of the following):

   - Minikube

```   - Docker Desktop with Kubernetes enabled

k8s/   - Kind (Kubernetes in Docker)

├── base/                          # Base Kubernetes manifests   - Cloud provider (GKE, EKS, AKS)

│   ├── kustomization.yaml         # Base Kustomize configuration

│   ├── namespace.yaml             # Default namespace2. **Tools**:

│   └── ingress.yaml               # Base ingress rules   - `kubectl` (v1.28+)

│   - `helm` (optional, for monitoring)

├── overlays/                      # Environment-specific configurations   - Docker (for building images)

│   ├── development/               # Development environment (1 replica, low resources)

│   │   ├── kustomization.yaml## Folder Structure

│   │   ├── namespace.yaml

│   │   ├── ingress-dev.yaml```

│   │   └── configmap-dev.yamlk8s/

│   ├── staging/                   # Staging environment (2 replicas, medium resources, HPA)├── namespace.yaml                 # Namespace definition

│   │   ├── kustomization.yaml├── kustomization.yaml            # Main kustomization

│   │   ├── namespace.yaml├── base/

│   │   ├── ingress-staging.yaml│   └── ingress.yaml              # Ingress configuration

│   │   └── hpa.yaml├── services/                      # All microservice manifests

│   └── production/                # Production environment (3 replicas, high resources, full HA)│   ├── conflictmanager/

│       ├── kustomization.yaml│   ├── schedulevotingmanager/

│       ├── namespace.yaml│   ├── usermanager/

│       ├── ingress-prod.yaml│   ├── coursemanager/

│       ├── hpa.yaml               # Horizontal Pod Autoscaler│   ├── schedulemanager/

│       ├── pdb.yaml               # Pod Disruption Budget│   └── frontend/

│       └── networkpolicy.yaml    # Network security policies├── infrastructure/                # Infrastructure components

││   ├── redis/

├── services/                      # Microservices manifests│   ├── mongodb/

│   ├── conflictmanager/          # Python Flask service│   └── postgres/

│   │   ├── deployment.yaml├── secrets/                       # Secret configurations

│   │   ├── service.yaml└── scripts/                       # Deployment scripts

│   │   └── configmap.yaml```

│   ├── schedulevotingmanager/    # Python Flask service

│   ├── usermanager/              # Java Spring Boot service## Quick Start

│   ├── coursemanager/            # Java Spring Boot service

│   ├── schedulemanager/          # Java Spring Boot service### 1. Build Docker Images

│   └── frontend/                 # React + Vite frontend

│```bash

├── infrastructure/                # Infrastructure components# From project root

│   ├── redis/                    # Redis cachecd source

│   │   ├── deployment.yaml

│   │   ├── service.yaml# Build all services

│   │   └── pvc.yamldocker build -t conflictmanager:latest ./conflictmanager

│   ├── mongodb/                  # MongoDB (optional - using Atlas)docker build -t schedulevotingmanager:latest ./schedulevotingmanager

│   │   ├── configmap.yamldocker build -t usermanager:latest ./usermanager

│   │   ├── service.yamldocker build -t coursemanager:latest ./coursemanager

│   │   └── statefulset.yamldocker build -t schedulemanager:latest ./schedulemanager

│   └── postgres/                 # PostgreSQL (for SonarQube)docker build -t frontend:latest ./frontend

│       ├── statefulset.yaml```

│       ├── service.yaml

│       └── configmap.yaml### 2. Configure Secrets

│

├── monitoring/                    # Observability stackEdit `secrets/database-secrets.yaml` and update:

│   ├── prometheus/               # Metrics collection- MongoDB credentials

│   │   ├── configmap.yaml        # Scrape configs- PostgreSQL credentials

│   │   ├── deployment.yaml- API keys (Gemini API key)

│   │   ├── service.yaml

│   │   └── rbac.yaml            # RBAC for Kubernetes metrics```bash

│   ├── grafana/                  # Metrics visualizationkubectl apply -f secrets/database-secrets.yaml

│   │   ├── configmap.yaml       # Datasources config```

│   │   ├── deployment.yaml

│   │   └── service.yaml### 3. Deploy Using Script

│   └── servicemonitor/           # Prometheus Operator CRDs

│       └── servicemonitor.yaml```bash

│cd deployments/k8s

├── secrets/                       # Secret configurationschmod +x scripts/deploy.sh

│   ├── database-secrets.yaml    # Database credentials, API keys./scripts/deploy.sh

│   └── README.md                # Security best practices```

│

├── scripts/                       # Deployment automation### 4. Manual Deployment

│   ├── deploy.sh                # Main deployment script

│   ├── rollback.sh              # Rollback deployments```bash

│   ├── scale.sh                 # Scale services# Create namespace

│   └── logs.sh                  # View service logskubectl apply -f namespace.yaml

│

├── argocd-app.yaml               # ArgoCD application definition# Deploy infrastructure

├── kustomization.yaml            # Root kustomizationkubectl apply -f infrastructure/

└── namespace.yaml                # Root namespace

```# Deploy services

kubectl apply -f services/

## 🚀 Quick Start

# Deploy ingress

### Prerequisiteskubectl apply -f base/ingress.yaml

```

1. **Kubernetes Cluster** - One of:

   - Docker Desktop (Recommended for local)### 5. Using Kustomize

   - Minikube

   - Cloud provider (EKS, GKE, AKS)```bash

kubectl apply -k .

2. **Tools**:```

   ```bash

   # Install kubectl## Access the Application

   brew install kubectl

   ### Option 1: Port Forwarding (Development)

   # Install kustomize (optional, kubectl has built-in support)

   brew install kustomize```bash

   ```# Frontend

kubectl port-forward svc/frontend 8080:80 -n academic-scheduler

### Step 1: Configure Secrets

# Access at http://localhost:8080

**IMPORTANT**: Update secrets before deploying!```



```bash### Option 2: Ingress (Recommended)

# Edit the secrets file

nano deployments/k8s/secrets/database-secrets.yaml```bash

```# Add to /etc/hosts

echo "127.0.0.1 academic-scheduler.local" | sudo tee -a /etc/hosts

Update these values:

- `MONGODB_URI`: Your MongoDB Atlas connection string# Port forward ingress controller

- `REDIS_PASSWORD`: Strong password for Rediskubectl port-forward -n ingress-nginx service/ingress-nginx-controller 8080:80

- `POSTGRES_USER` & `POSTGRES_PASSWORD`: PostgreSQL credentials

- `GRAFANA_ADMIN_USER` & `GRAFANA_ADMIN_PASSWORD`: Grafana admin credentials# Access at http://academic-scheduler.local:8080

- `JWT_SECRET`: Secret key for JWT tokens```



### Step 2: Deploy### Option 3: LoadBalancer (Cloud)



**Option A: Using deployment script (Recommended)**If running on cloud provider, the ingress will automatically get an external IP.



```bash```bash

# Make scripts executablekubectl get ingress -n academic-scheduler

chmod +x deployments/k8s/scripts/*.sh```



# Deploy to development## Monitoring

./deployments/k8s/scripts/deploy.sh development default

### Access Prometheus

# Deploy to staging

./deployments/k8s/scripts/deploy.sh staging academic-scheduler-staging```bash

kubectl port-forward svc/prometheus 9090:9090 -n academic-scheduler

# Deploy to production# Open http://localhost:9090

./deployments/k8s/scripts/deploy.sh production academic-scheduler-prod```

```

### Access Grafana

**Option B: Manual deployment with kubectl**

```bash

```bashkubectl port-forward svc/grafana 3000:3000 -n academic-scheduler

# Development# Open http://localhost:3000

kubectl apply -k deployments/k8s/overlays/development# Default credentials: admin/admin

```

# Staging

kubectl apply -k deployments/k8s/overlays/staging## Useful Commands



# Production### View Logs

kubectl apply -k deployments/k8s/overlays/production

``````bash

# All pods

### Step 3: Verify Deploymentkubectl logs -f deployment/conflictmanager -n academic-scheduler



```bash# Specific pod

# Check all resourceskubectl logs -f <pod-name> -n academic-scheduler

kubectl get all -n <namespace>

# All containers in a pod

# Check pod statuskubectl logs -f <pod-name> --all-containers -n academic-scheduler

kubectl get pods -n <namespace>```



# Watch pods come up### Check Pod Status

kubectl get pods -n <namespace> -w

``````bash

kubectl get pods -n academic-scheduler

### Step 4: Access Serviceskubectl describe pod <pod-name> -n academic-scheduler

```

```bash

# Frontend### Check Services

kubectl port-forward svc/frontend 5173:5173 -n <namespace>

# Open: http://localhost:5173```bash

kubectl get svc -n academic-scheduler

# Prometheus```

kubectl port-forward svc/prometheus 9090:9090 -n <namespace>

# Open: http://localhost:9090### Scale Deployments



# Grafana```bash

kubectl port-forward svc/grafana 3000:3000 -n <namespace>kubectl scale deployment conflictmanager --replicas=3 -n academic-scheduler

# Open: http://localhost:3000 (admin/admin)```

```

### Update Deployment

## 🔧 Configuration

```bash

### Environment Comparison# Set new image

kubectl set image deployment/usermanager usermanager=usermanager:v2 -n academic-scheduler

| Feature | Development | Staging | Production |

|---------|------------|---------|-----------|# Restart deployment

| **Replicas** | 1 | 2 | 3 |kubectl rollout restart deployment/usermanager -n academic-scheduler

| **Memory (Backend)** | 128-256Mi | 256Mi-1Gi | 512Mi-2Gi |

| **CPU (Backend)** | 100-200m | 200-500m | 300-1000m |# Check rollout status

| **Auto-scaling** | ❌ No | ✅ Yes (2-5 pods) | ✅ Yes (3-10 pods) |kubectl rollout status deployment/usermanager -n academic-scheduler

| **Pod Disruption Budget** | ❌ No | ❌ No | ✅ Yes (min 2 available) |```

| **Network Policies** | ❌ No | ❌ No | ✅ Yes |

| **TLS/SSL** | ❌ No | ✅ Yes (staging cert) | ✅ Yes (production cert) |### Rollback Deployment

| **Debug Logging** | ✅ Enabled | ❌ Disabled | ❌ Disabled |

| **Rate Limiting** | ❌ No | ✅ 100 req/s | ✅ 200 req/s |```bash

kubectl rollout undo deployment/usermanager -n academic-scheduler

### Service Ports```



| Service | Port | Protocol |### Execute Commands in Pod

|---------|------|----------|

| frontend | 5173 | HTTP |```bash

| conflictmanager | 5000 | HTTP |kubectl exec -it <pod-name> -n academic-scheduler -- /bin/bash

| schedulevotingmanager | 5000 | HTTP |```

| usermanager | 8082 | HTTP |

| coursemanager | 8081 | HTTP |## Troubleshooting

| schedulemanager | 8083 | HTTP |

| redis | 6379 | Redis |### Pods not starting

| postgres | 5432 | PostgreSQL |

| prometheus | 9090 | HTTP |```bash

| grafana | 3000 | HTTP |# Check events

kubectl get events -n academic-scheduler --sort-by='.lastTimestamp'

## 🛠️ Management

# Describe pod

### Scaling Serviceskubectl describe pod <pod-name> -n academic-scheduler



```bash# Check logs

# Using scriptkubectl logs <pod-name> -n academic-scheduler

./deployments/k8s/scripts/scale.sh usermanager 5 <namespace>```



# Manual### Database Connection Issues

kubectl scale deployment/usermanager --replicas=5 -n <namespace>

``````bash

# Check if databases are running

### Viewing Logskubectl get pods -l app=mongodb -n academic-scheduler

kubectl get pods -l app=postgres -n academic-scheduler

```bashkubectl get pods -l app=redis -n academic-scheduler

# Using script (recommended)

./deployments/k8s/scripts/logs.sh usermanager <namespace> -f# Test connectivity

kubectl run -it --rm debug --image=busybox --restart=Never -n academic-scheduler -- sh

# Manual# Inside the pod:

kubectl logs -f deployment/usermanager -n <namespace># nslookup mongodb

# nslookup postgres

# All pods# nslookup redis

kubectl logs -f -l app=usermanager -n <namespace>```



# Previous container (if crashed)### Image Pull Errors

kubectl logs <pod-name> --previous -n <namespace>

``````bash

# If using local images with Minikube

### Rolling Updateseval $(minikube docker-env)

# Then rebuild images

```bash

# Update image# If using Kind

kubectl set image deployment/usermanager \kind load docker-image conflictmanager:latest

  usermanager=usermanager:v2.0 -n <namespace>kind load docker-image usermanager:latest

# ... etc

# Check rollout status```

kubectl rollout status deployment/usermanager -n <namespace>

## Clean Up

# View rollout history

kubectl rollout history deployment/usermanager -n <namespace>### Delete Everything

```

```bash

### Rollbackkubectl delete namespace academic-scheduler

```

```bash

# Using script### Delete Specific Resources

./deployments/k8s/scripts/rollback.sh usermanager <namespace>

```bash

# Rollback all serviceskubectl delete deployment conflictmanager -n academic-scheduler

./deployments/k8s/scripts/rollback.sh all <namespace>kubectl delete svc conflictmanager -n academic-scheduler

```

# Manual

kubectl rollout undo deployment/usermanager -n <namespace>## Production Considerations



# Rollback to specific revision1. **Use Helm Charts** for easier management

kubectl rollout undo deployment/usermanager --to-revision=2 -n <namespace>2. **Implement HPA** (Horizontal Pod Autoscaler)

```3. **Use Secrets Management** (Sealed Secrets, External Secrets Operator)

4. **Add Network Policies** for security

## 📊 Monitoring5. **Implement Resource Quotas**

6. **Use PodDisruptionBudgets**

### Prometheus Metrics7. **Add Backup Solutions** for databases

8. **Implement Service Mesh** (Istio/Linkerd) for advanced traffic management

Access Prometheus at `http://localhost:9090` (after port-forward)9. **Use GitOps** (ArgoCD/Flux) for deployments

10. **Add Logging Stack** (ELK/Loki)

**Key Metrics**:

- `jvm_memory_used_bytes` - Java heap memory usage## Next Steps

- `http_server_requests_seconds` - HTTP request duration

- `system_cpu_usage` - CPU utilization1. Set up CI/CD pipeline

- `process_uptime_seconds` - Service uptime2. Implement auto-scaling

3. Add monitoring alerts

**Sample Queries**:4. Configure backup and disaster recovery

```promql5. Implement security scanning
# Average request rate
rate(http_server_requests_seconds_count[5m])

# 95th percentile latency
histogram_quantile(0.95, http_server_requests_seconds_bucket)

# Memory usage by service
sum(jvm_memory_used_bytes) by (app)
```

### Grafana Dashboards

Access Grafana at `http://localhost:3000` (admin/admin)

Pre-configured dashboards:
1. **Kubernetes Overview** - Cluster health, pod status
2. **JVM Metrics** - Heap usage, GC, threads
3. **Application Performance** - Request rates, latency, errors
4. **Redis Metrics** - Cache hit rate, connections

## 🔍 Troubleshooting

### Pods Not Starting

```bash
# Check events
kubectl describe pod <pod-name> -n <namespace>

# Check logs
kubectl logs <pod-name> -n <namespace>

# Check resource constraints
kubectl top pods -n <namespace>
kubectl top nodes
```

### Service Connection Issues

```bash
# Check endpoints
kubectl get endpoints -n <namespace>

# Test DNS resolution
kubectl run test --image=busybox --rm -it -n <namespace> -- nslookup usermanager

# Test service connectivity
kubectl run test --image=curlimages/curl --rm -it -n <namespace> -- \
  curl http://usermanager:8082/actuator/health
```

### Database Connection Errors

```bash
# Verify secrets are applied
kubectl get secret app-secrets -n <namespace>

# Check secret values (be careful!)
kubectl get secret app-secrets -n <namespace> -o jsonpath='{.data.MONGODB_URI}' | base64 -d

# Check if MongoDB is accessible from pod
kubectl exec -it <pod-name> -n <namespace> -- sh
# Inside pod: try connecting to database
```

### Image Pull Errors

```bash
# For local development with Minikube
eval $(minikube docker-env)
# Rebuild images

# For Docker Desktop
docker build -t usermanager:latest ./source/usermanager

# Check image exists
docker images | grep usermanager
```

### Resource Issues

```bash
# Check HPA status
kubectl get hpa -n <namespace>
kubectl describe hpa usermanager-hpa -n <namespace>

# Check metrics server
kubectl get apiservice v1beta1.metrics.k8s.io
kubectl top nodes
kubectl top pods -n <namespace>
```

## 🔒 Security Best Practices

### 1. Secrets Management

```bash
# NEVER commit secrets to Git!
# Add to .gitignore:
echo "deployments/k8s/secrets/*.yaml" >> .gitignore

# Use external secret management in production:
# - AWS Secrets Manager
# - HashiCorp Vault
# - Sealed Secrets
# - External Secrets Operator
```

### 2. Network Policies (Production Only)

Network policies restrict pod-to-pod communication:
- Frontend → Backend only
- Backend → Database/Redis only
- Monitoring → All (for metrics scraping)

### 3. RBAC

```bash
# Create service account
kubectl create serviceaccount app-sa -n <namespace>

# Bind minimal permissions
kubectl create rolebinding app-binding \
  --serviceaccount=<namespace>:app-sa \
  --role=pod-reader \
  -n <namespace>
```

### 4. Pod Security

Production deployments include:
- Non-root user execution
- Read-only root filesystem
- Dropped capabilities
- Security contexts

## 🚢 GitOps with ArgoCD

### Install ArgoCD

```bash
# Create ArgoCD namespace
kubectl create namespace argocd

# Install ArgoCD
kubectl apply -n argocd -f \
  https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Access ArgoCD UI
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Get admin password
kubectl -n argocd get secret argocd-initial-admin-secret \
  -o jsonpath="{.data.password}" | base64 -d
```

### Deploy Application

```bash
# Apply ArgoCD application
kubectl apply -f deployments/k8s/argocd-app.yaml

# Check sync status
argocd app get academic-scheduler

# Sync manually
argocd app sync academic-scheduler
```

## 📈 Performance Tuning

### Java Services

Edit ConfigMaps to adjust JVM settings:
```yaml
JAVA_OPTS: "-Xms512m -Xmx1g -XX:+UseG1GC -XX:MaxGCPauseMillis=200"
```

### Python Services

Adjust Gunicorn workers:
```yaml
MAX_WORKERS: "4"  # 2 * CPU_CORES + 1
```

### Database Connection Pools

Update application.properties:
```properties
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=5
```

## 🧹 Cleanup

```bash
# Delete specific environment
kubectl delete namespace academic-scheduler-dev
kubectl delete namespace academic-scheduler-staging
kubectl delete namespace academic-scheduler-prod

# Or delete all resources
kubectl delete -k deployments/k8s/overlays/development
kubectl delete -k deployments/k8s/overlays/staging
kubectl delete -k deployments/k8s/overlays/production
```

## 📚 Additional Resources

- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kustomize Documentation](https://kustomize.io/)
- [Prometheus Documentation](https://prometheus.io/docs/)
- [ArgoCD Documentation](https://argo-cd.readthedocs.io/)

## 🆘 Support

For issues:
1. Check logs: `./scripts/logs.sh <service> <namespace>`
2. Check pod status: `kubectl describe pod <pod-name>`
3. Review this troubleshooting guide
4. Contact the development team

---

**Last Updated**: November 10, 2025  
**Version**: 1.0.0
