#!/bin/bash

NODE_ENV=test bin/enhanced-tape-runner "$@" --skip-handle-rejections | node_modules/.bin/tap-spec