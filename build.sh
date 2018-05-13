#! /usr/bin/env bash

docker build -t fleetit-sensor sensor
docker build -t fleetit-websocket websocket
docker build -t fleetit-client client
docker build -t fleetit-postgres postgres
docker build -t fleetit-api api
docker build -t fleetit-alerts alerts
docker build -t fleetit-logstash  monitoring/logstash
docker build -t fleetit-elasticsearch monitoring/elasticsearch
docker build -t fleetit-metricbeat monitoring/metricbeat
docker build -t fleetit-kibana monitoring/kibana

