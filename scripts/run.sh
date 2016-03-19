#!/usr/bin/env bash
set -e

echo "NPM Version:"
npm -v
npm set progress=false

echo "Building Package"
npm run build-package

echo "Starting Server"
DEBUG=express:* node dist/index.js