#! /usr/bin/env bash

set -euo pipefail

docker build -t fleetit-jenkins jenkins
docker build -t fleetit-sensor sensor
docker build -t fleetit-websocket websocket
docker build -t fleetit-client-development -f client/Dockerfile.development client
docker build -t fleetit-client-production -f client/Dockerfile.production client
docker build -t fleetit-postgres postgres
docker build -t fleetit-api api
docker build -t fleetit-alerts alerts
docker build -t fleetit-elasticsearch monitoring/elasticsearch
docker build -t fleetit-metricbeat monitoring/metricbeat
docker build -t fleetit-kibana monitoring/kibana
docker build -t fleetit-import_dashboards monitoring/customDashboards
