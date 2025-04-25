#!/bin/bash
set -e

# Set variables
IMAGE_NAME="academic-scheduler-frontend"
IMAGE_TAG="latest"
BUILDER="paketobuildpacks/builder:base"
FRONTEND_DIR="../../../frontend"  # Adjust path to your frontend directory

# Navigate to the frontend directory
cd "$FRONTEND_DIR"

# Create .npmrc file to use pnpm
cat > .npmrc << EOF
auto-install-peers=true
node-linker=hoisted
EOF

# Create project.toml file for buildpack configuration
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

# Build the image using pack
pack build "$IMAGE_NAME:$IMAGE_TAG" \
  --builder "$BUILDER" \
  --env BP_NODE_VERSION=18.x \
  --env BP_PNPM_VERSION=8.x \
  --env BP_WEB_SERVER=nginx \
  --env BP_WEB_SERVER_ROOT=dist \
  --path .

echo "Frontend image built successfully: $IMAGE_NAME:$IMAGE_TAG"