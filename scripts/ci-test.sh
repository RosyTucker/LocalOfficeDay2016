#!/usr/bin/env bash
set -e

echo "NPM Version:"
npm -v
npm set progress=false

echo "Installing Dependencies"
npm install

./scripts/local-test.sh