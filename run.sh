#! /usr/bin/env bash

#docker build -t fleetit-sensor --no-cache sensor
#docker build -t fleetit-websocket --no-cache websocket
#docker build -t fleetit-client --no-cache client
#docker build -t fleetit-postgres --no-cache postgres
#docker build -t fleetit-api --no-cache api
#docker build -t fleetit-alerts --no-cache alerts
#docker build -t fleetit-logstash --no-cache monitoring/logstash
#docker build -t fleetit-elasticsearch --no-cache monitoring/elasticsearch
#docker build -t fleetit-metricbeat --no-cache monitoring/metricbeat
#docker build -t fleetit-kibana --no-cache monitoring/kibana

docker swarm init --force-new-cluster
docker stack deploy -c docker-compose.yml fleetit
docker stack rm fleetit
docker swarm leave --force

