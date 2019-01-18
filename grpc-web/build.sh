#!/bin/bash
set -eu
BASEDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
export PATH="$BASEDIR/node_modules/.bin:$PATH"

set -x
webpack-cli --config=webpack1.config.js
webpack-cli --config=webpack2.config.js

