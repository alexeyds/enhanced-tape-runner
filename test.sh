#!/bin/bash

NODE_ENV=test bin/enhanced-tape-runner "$@" --no-handle-rejections | node_modules/.bin/tap-spec-dot