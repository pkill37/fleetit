#! /bin/bash

mkdir -p jenkins

docker service create --name jenkins \
    -p 8082:8080 \
    -p 50000:50000 \
    -e JENKINS_OPTS="--prefix=/jenkins" \
    --mount "type=bind,source=$PWD/jenkins,target=/var/jenkins_home" \
    --reserve-memory 300m \
    jenkins
