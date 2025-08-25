#!/bin/bash

# Set Node.js environment for React Native Android builds
export PATH="/Users/sayedsuhail/.nvm/versions/node/v20.19.4/bin:$PATH"
export NODE_BINARY="/Users/sayedsuhail/.nvm/versions/node/v20.19.4/bin/node"
export NPM_BINARY="/Users/sayedsuhail/.nvm/versions/node/v20.19.4/bin/npm"
export NPX_BINARY="/Users/sayedsuhail/.nvm/versions/node/v20.19.4/bin/npx"

echo "Node.js environment set:"
echo "PATH: $PATH"
echo "NODE_BINARY: $NODE_BINARY"
echo "NPM_BINARY: $NPM_BINARY"
echo "NPX_BINARY: $NPX_BINARY"

# Execute the passed command with the updated environment
exec "$@"
