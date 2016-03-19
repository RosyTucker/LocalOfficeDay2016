#!/usr/bin/env bash
set -e

echo "Installing Global Dependencies"
npm install -g babel-cli

echo "Installing Local Dependencies"
npm install

echo "Serving"
babel-node index.js