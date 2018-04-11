#! /usr/bin/env bash
set -eu

docker-compose down --volumes
docker-compose build
docker-compose up -d zookeeper-1 zookeeper-2 zookeeper-3 kafka-1 kafka-2 kafka-3
sleep 60
docker-compose up -d websocket
docker-compose up -d --scale sensor=10 sensor
docker-compose up -d alerts
docker-compose up -d --build client
