#!/bin/bash

set -e
source .env

FRONT_IMAGE="${DOCKERHUB_USER}/${PROJECT_NAME}-front:latest"
BACK_IMAGE="${DOCKERHUB_USER}/${PROJECT_NAME}-back:latest"

# Choix du Dockerfile, par défaut prod, sinon dev
FRONT_DOCKERFILE="./front/Dockerfile.prod"
BACK_DOCKERFILE="./back/Dockerfile.prod"

echo "🔨 Build de l'image Front avec $FRONT_DOCKERFILE..."
docker build -t $FRONT_IMAGE -f $FRONT_DOCKERFILE ./front

echo "🔨 Build de l'image Back avec $BACK_DOCKERFILE..."
docker build -t $BACK_IMAGE -f $BACK_DOCKERFILE ./back

echo "🔑 Connexion à Docker Hub..."
docker login

echo "🚀 Push de l'image Front vers Docker Hub..."
docker push $FRONT_IMAGE

echo "🚀 Push de l'image Back vers Docker Hub..."
docker push $BACK_IMAGE

echo "✅ Build et push terminés."
