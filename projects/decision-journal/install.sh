#!/bin/bash

# Set executable permission
chmod +x decision-journal.js

# Install dependencies
npm install

# Make the command globally available
npm link

# Create example decision if none exist
if [ ! "$(ls -A data)" ]; then
    echo "Creating example decision entry..."
    ./decision-journal.js new
fi

echo "Installation complete! Try running: decision-journal help"