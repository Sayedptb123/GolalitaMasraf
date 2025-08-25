#!/bin/bash

# Wrapper script for Gradle that sets Node.js environment
# This ensures React Native autolinking can find npx

# Set Node.js environment variables
export PATH="/Users/sayedsuhail/.nvm/versions/node/v20.19.4/bin:$PATH"
export NODE_BINARY="/Users/sayedsuhail/.nvm/versions/node/v20.19.4/bin/node"
export NPM_BINARY="/Users/sayedsuhail/.nvm/versions/node/v20.19.4/bin/npm"
export NPX_BINARY="/Users/sayedsuhail/.nvm/versions/node/v20.19.4/bin/npx"

# Verify environment
echo "Gradle wrapper environment:"
echo "PATH: $PATH"
echo "NODE_BINARY: $NODE_BINARY"
echo "NPX_BINARY: $NPX_BINARY"

# Execute the original gradlew script
exec "$(dirname "$0")/gradlew" "$@"
