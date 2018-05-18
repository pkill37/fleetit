#! /bin/bash

mkdir -p jenkins-data

docker service create \
    --name fleetit-jenkins \
    --network fleetit_default \
    -u root \
    -p 8082:8080 \
    -p 50000:50000 \
    --mount "type=bind,source=$PWD/jenkins-data,target=/var/jenkins_home" \
    --mount "type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock" \
    fleetit-jenkins
