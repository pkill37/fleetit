#! /usr/bin/env bash
set -eu

docker-compose down --volumes
docker-compose up --build -d zookeeper-1 zookeeper-2 zookeeper-3 kafka-1 kafka-2 kafka-3

# Enable monotoring
if [ $# -ne 0 ]; then
    case $1 in
        -m|--monotoring)
        docker-compose up -d elasticsearch kibana kibana_index_pattern logstash logspout metricbeat metricbeat-dashboard-setup
        ;;
        *)
        # Default
        ;;
    esac
fi

echo "Waiting 60 sec for kafka to set up..."
sleep 60
docker-compose up -d websocket
docker-compose up -d --scale sensor=10 sensor
docker-compose up -d alerts
docker-compose up -d --build client
