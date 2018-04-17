#! /usr/bin/env bash
set -eu

docker-compose down --volumes --remove-orphans
docker-compose up -d --build zookeeper-1 zookeeper-2 zookeeper-3 kafka-1 kafka-2 kafka-3

# Enable monotoring
if [ $# -ne 0 ]; then
    case $1 in
        -m|--monitoring)
        docker-compose up -d --build logstash logspout elasticsearch metricbeat metricbeat-dashboard-setup kibana
        ;;
        *)
        # Default
        ;;
    esac
fi

echo "Waiting 60 sec for kafka to set up..."
sleep 60
docker-compose up -d --build websocket
docker-compose up -d --build --scale sensor=2 sensor
docker-compose up -d --build alerts
docker-compose up -d --build client
