# IMPORTANT: This file contains sensitive information
# 
# DO NOT commit this file to version control
# Add to .gitignore: deployments/k8s/secrets/*.yaml
#
# For production:
# 1. Use external secret management (AWS Secrets Manager, HashiCorp Vault, etc.)
# 2. Use Sealed Secrets or External Secrets Operator
# 3. Encrypt secrets at rest using Kubernetes encryption
# 4. Use RBAC to restrict access to secrets
#
# To create secrets manually:
# kubectl create secret generic app-secrets \
#   --from-literal=MONGODB_URI='your-connection-string' \
#   --from-literal=REDIS_PASSWORD='your-password' \
#   --from-literal=POSTGRES_USER='user' \
#   --from-literal=POSTGRES_PASSWORD='password' \
#   --from-literal=GRAFANA_ADMIN_USER='admin' \
#   --from-literal=GRAFANA_ADMIN_PASSWORD='password' \
#   --from-literal=JWT_SECRET='your-jwt-secret'
#
# To update a secret:
# kubectl create secret generic app-secrets --from-literal=KEY=VALUE --dry-run=client -o yaml | kubectl apply -f -
