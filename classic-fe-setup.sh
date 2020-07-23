#!/bin/bash

# This routine will create the usual setup for a frontend project.
# It will do the following:
# - Initialize the package manager, using npm
# - Create directory structure
# - Install and do webpack setup.

npm init -y
echo "node_modules/" >> .gitignore

npm install webpack webpack-cli --save-dev
mkdir src
mkdir dist
