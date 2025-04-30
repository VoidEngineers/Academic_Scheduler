#!/bin/bash


set -e  


# FRONTEND_DIR="../../frontend"
BUILD_OUTPUT_DIR="dist"
NODE_VERSION="18"
PNPM_VERSION="8"

echo "Starting frontend build process..."


cd "$FRONTEND_DIR" || { echo "ERROR: Frontend directory not found!"; exit 1; }
echo "Changed to frontend directory: $(pwd)"

if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed. Please install Node.js v$NODE_VERSION"
    exit 1
fi

NODE_CURRENT=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_CURRENT" != "$NODE_VERSION" ]; then
    echo "WARNING: Using Node.js v$NODE_CURRENT instead of recommended v$NODE_VERSION"
fi


if ! command -v pnpm &> /dev/null; then
    echo "Installing pnpm..."
    npm install -g pnpm@$PNPM_VERSION
fi

echo "Installing dependencies with pnpm..."
pnpm install

echo "Building the frontend application..."
pnpm build

if [ ! -d "$BUILD_OUTPUT_DIR" ]; then
    echo "ERROR: Build failed! Output directory '$BUILD_OUTPUT_DIR' not found"
    exit 1
fi

echo "Frontend build completed successfully!"
echo "Build output available at: $(pwd)/$BUILD_OUTPUT_DIR"
echo "Files in build directory:"
ls -la "$BUILD_OUTPUT_DIR"

echo ""
echo "To deploy manually, copy the build output to nginx html directory:"
echo "cp -r $BUILD_OUTPUT_DIR/* /path/to/nginx/html/"
echo ""
echo "Or use docker-compose to deploy the entire application stack."