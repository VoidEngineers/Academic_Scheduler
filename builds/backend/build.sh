#!/bin/bash
set -e


IMAGE_NAME="academic-scheduler-frontend"
IMAGE_TAG="latest"
BUILDER="paketobuildpacks/builder:base"
FRONTEND_DIR="../../../frontend"  


cd "$FRONTEND_DIR"

cat > .npmrc << EOF
auto-install-peers=true
node-linker=hoisted
EOF


cat > project.toml << EOF
[[build.env]]
name = "BP_NODE_RUN_SCRIPTS"
value = "build"

[[build.env]]
name = "BP_PNPM_ENABLED"
value = "true"

[[build.env]]
name = "BP_NODE_PROJECT_PATH"
value = "."

[[build.env]]
name = "NODE_ENV"
value = "production"

[[build.env]]
name = "NPM_CONFIG_PRODUCTION"
value = "false"
EOF


pack build "$IMAGE_NAME:$IMAGE_TAG" \
  --builder "$BUILDER" \
  --env BP_NODE_VERSION=18.x \
  --env BP_PNPM_VERSION=8.x \
  --env BP_WEB_SERVER=nginx \
  --env BP_WEB_SERVER_ROOT=dist \
  --path .

echo "Frontend image built successfully: $IMAGE_NAME:$IMAGE_TAG"