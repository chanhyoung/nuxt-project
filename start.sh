#!/bin/sh

# Start the Nuxt.js server in the background
# The entry point for a Nuxt 3 app is in .output/server/index.mjs
node .output/server/index.mjs &

# Start Nginx in the foreground
# This keeps the container running
nginx -g 'daemon off;'
