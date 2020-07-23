#!/bin/bash

# This routine will create the usual setup for a frontend project.
# It will do the following:
#   Initialize the package manager, using npm
#   Create directory structure
#   Install and setup webpack

# npm setup
echo "Initializing npm for package management..."
npm init -y
echo "node_modules/" >> .gitignore
echo "npm initialized"

echo "Installing dependencies"
npm install -g npm-add-script --save-dev

# Webpack setup
npm install webpack webpack-cli --save-dev
echo "Dependencies added"


echo "Creating directory structure and base files..."
mkdir src
mkdir dist

echo "<!DOCTYPE html>
<html>
  <head>
  </head>

  <body>
    <script src='./main.js'></script>
  </body>
</html>
" > ./dist/index.html

echo "console.log('hello world :)')" > ./src/index.js

echo "const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
" > ./webpack.config.js

npmAddScript -k build -v "webpack"
npmAddScript -k watch -v "webpack --watch"

echo "Directory and base files created"

echo "Running webpack..."
npm run watch &
open dist/index.html
echo "Done :)"
