#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Define environment variables
export NODE_ENV=production
export MONGODB_URI="your_mongodb_connection_string"
export PORT=3000

# Build the React application
echo "Building the React application..."
cd client
npm install
npm run build

# Move the build files to the server directory
echo "Moving build files to server directory..."
mv build ../server/public

# Install server dependencies
echo "Installing server dependencies..."
cd ../server
npm install --production

# Start the server
echo "Starting the server..."
node server.js &

# Check if the server started successfully
if ps aux | grep -v grep | grep node; then
    echo "Server started successfully."
else
    echo "Failed to start the server." >&2
    exit 1
fi

echo "Deployment preparation completed successfully."