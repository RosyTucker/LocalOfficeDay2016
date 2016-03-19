#!/usr/bin/env bash
set -e

echo "NPM Version:"
npm -v
npm set progress=false

echo "Installing Global Dependencies"
npm install -g babel-cli
npm install -g mocha

echo "Installing Local Dependencies"
npm install

echo "Running Lint"
npm run lint

echo "Running Unit Tests"
npm run test

echo "Building Package"
npm run build-package

