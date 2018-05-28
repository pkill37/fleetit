#! /usr/bin/env bash

images=(
    "jenkins"
    "sensor"
    "websocket"
    "client"
    "postgres"
    "api"
    "alerts"
    "logstash"
    "elasticsearch"
    "metricbeat"
    "kibana"
)

for image in "${images[@]}"; do
    docker build -t faviouz/fleetit-$image $image
    docker push faviouz/fleetit-$image:latest
done

docker build -t faviouz/fleetit-logstash monitoring/logstash
docker build -t faviouz/fleetit-elasticsearchmonitoring/elasticsearch
docker build -t faviouz/fleetit-metricbeat monitoring/metricbeat
docker build -t faviouz/fleetit-kibana monitoring/kibana
docker push faviouz/fleetit-logstash:latest
docker push faviouz/fleetit-elasticsearch:latest
docker push faviouz/fleetit-metricbeat:latest
docker push faviouz/fleetit-kibana:latest
