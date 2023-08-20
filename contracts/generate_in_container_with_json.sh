#!/bin/bash
set -eu

DOCKER_IMAGE_NAME="frontend-json-env"
DOCKER_CONTAINER_NAME="frontend-json-env-container"
FRONTEND_OPENAPI_PATH="./src/generatedAPI"
GENERATOR_DOCKERFILE_PATH="./openapi.Dockerfile"
CONTAINER_OPENAPI_PATH="/srv/src/generatedAPI/."

echo "generate contracts in docker..."
docker build --tag $DOCKER_IMAGE_NAME -f $GENERATOR_DOCKERFILE_PATH .

echo "cleanup..."
rm -rf $FRONTEND_OPENAPI_PATH

echo "run container..."
docker create --name $DOCKER_CONTAINER_NAME $DOCKER_IMAGE_NAME

echo "copy files from container..."
docker cp $DOCKER_CONTAINER_NAME:$CONTAINER_OPENAPI_PATH $FRONTEND_OPENAPI_PATH

echo "stop container..."
docker rm -f $DOCKER_CONTAINER_NAME
