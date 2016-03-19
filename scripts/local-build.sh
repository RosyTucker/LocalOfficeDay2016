#!/usr/bin/env bash
set -e

echo "NPM Version:"
npm -v
npm set progress=false

echo "Running Lint"
./node_modules/.bin/eslint -c eslint.config.json . --ignore-path .eslintignore

echo "Running Unit Tests"
mocha test --recursive --compilers js:babel-register

echo "Building Package"
npm run build-package

