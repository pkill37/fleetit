#! /usr/bin/env bash

set -euo pipefail

docker build --rm -t fleetit-jenkins jenkins

docker build --rm -t fleetit-sensor sensor

docker build --rm -t fleetit-websocket websocket

docker build --rm -t fleetit-client-development -f client/Dockerfile.development client

docker build --rm -t fleetit-client-production -f client/Dockerfile.production client

docker build --rm -t fleetit-postgres postgres

docker build --rm -t fleetit-api api

docker build --rm -t fleetit-alerts alerts

docker build --rm -t fleetit-elasticsearch monitoring/elasticsearch

docker build --rm -t fleetit-metricbeat monitoring/metricbeat

docker build --rm -t fleetit-kibana monitoring/kibana

docker build --rm -t fleetit-import_dashboards monitoring/customDashboards
