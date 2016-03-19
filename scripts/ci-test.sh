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
./node_modules/.bin/eslint -c .eslintconfig.json . --ignore-path .eslintignore

echo "Running Unit Tests"
mocha test --recursive --compilers js:babel-register
