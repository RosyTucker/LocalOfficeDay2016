#!/usr/bin/env bash
set -e

echo "NPM Version:"
npm -v
npm set progress=false

echo "Running Lint"
./node_modules/.bin/eslint -c .eslintconfig.json . --ignore-path .eslintignore

echo "Running Tests"
mocha test --recursive --compilers js:babel-register