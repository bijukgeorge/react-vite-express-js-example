#!/bin/bash

docker compose \
  -p react-vite-express-development \
  -f docker-compose.yml \
  up \
    --remove-orphans \
    --build \
    -d
