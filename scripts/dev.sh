#!/bin/bash

MODE=$1
node_analyse="no-analysis"
if [ "$MODE" = "analyse" ]; then
    node_analyse="analyse"
fi

rm -f wwwroot/dist/*
# NODE_OPTIONS=--max_old_space_size=8192 NODE_ENV=development webpack --config config/webpack.dev.conf.js
NODE_OPTIONS=--max_old_space_size=8192 NODE_ENV=development NODE_ANALYSE="$node_analyse" webpack-dev-server --config config/webpack.dev.conf.js --mode development
