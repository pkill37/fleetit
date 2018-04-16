#! /usr/bin/env bash
set -eu

docker-compose down --volumes --remove-orphans
docker-compose up -d --build zookeeper-1 zookeeper-2 zookeeper-3 kafka-1 kafka-2 kafka-3
sleep 60
docker-compose up -d --build websocket
docker-compose up -d --build --scale sensor=2 sensor
docker-compose up --build alerts
docker-compose up --build client
