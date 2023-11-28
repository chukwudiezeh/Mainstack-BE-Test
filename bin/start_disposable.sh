#!/bin/bash

#handles everything from building the image to 
IMAGE_NAME="store-front"
NETWORK_NAME="store-front-network"
CONTAINER_NAME="store-front-container"

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT="$(dirname "${SCRIPT_DIR}")"

echo " ----- Building Image -----"
docker build -t ${IMAGE_NAME} .

# Check if the Docker network exists
if docker network inspect ${NETWORK_NAME} > /dev/null 2>&1; then
    echo " ----- Docker network '${NETWORK_NAME}' already exists -----"
else
    echo " ----- Creating Docker network '${NETWORK_NAME}' -----"
    docker network create --driver=bridge ${NETWORK_NAME}
fi

echo " ----- Starting Disposable Docker Containers -----"
echo " ----- Using .env File from [${ROOT}] -----"

docker run -it --name ${CONTAINER_NAME} -p 4000:4000 --network=${NETWORK_NAME} --env-file=${ROOT}/.env ${IMAGE_NAME} /bin/bash

#No point leaving our container running after exiting the container
echo " ----- EXITED from disposable container -----"
echo " ----- Removing Containers -----"

docker ps -a | grep 'store-front' | awk '{print $1 }' | xargs -I {} docker rm -f {}