#!/usr/bin/env bash
set -e

echo "Serving"
DEBUG=express:* babel-node index.js