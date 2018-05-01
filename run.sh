#! /usr/bin/env bash
set -eu

docker-compose down --volumes --remove-orphans
docker-compose build zookeeper-1 zookeeper-2 zookeeper-3 kafka-1 kafka-2 kafka-3 websocket sensor postgres api alerts
docker-compose up -d zookeeper-1 zookeeper-2 zookeeper-3 kafka-1 kafka-2 kafka-3

# Enable monotoring
if [ $# -ne 0 ]; then
    case $1 in
        -m|--monitoring)
        docker-compose up -d --build logstash logspout elasticsearch metricbeat kibana
        ;;
        *)
        # Default
        ;;
    esac
fi

echo "Waiting 60 sec for kafka to set up..."
sleep 60
docker-compose up -d websocket
docker-compose up -d --scale sensor=5 sensor
docker-compose up -d postgres
docker-compose up -d api
docker-compose up -d alerts
#docker-compose up -d client
