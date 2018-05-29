#! /usr/bin/env bash

set -euo pipefail

docker build -t faviouz/fleetit-jenkins jenkins
docker push faviouz/fleetit-jenkins:latest

docker build -t faviouz/fleetit-sensor sensor
docker push faviouz/fleetit-sensor:latest

docker build -t faviouz/fleetit-websocket websocket
docker push faviouz/fleetit-websocket:latest

docker build -t faviouz/fleetit-client-development -f client/Dockerfile.development client
docker push faviouz/fleetit-client-development:latest

docker build -t faviouz/fleetit-client-production -f client/Dockerfile.production client
docker push faviouz/fleetit-client-production:latest

docker build -t faviouz/fleetit-postgres postgres
docker push faviouz/fleetit-postgres:latest

docker build -t faviouz/fleetit-api api
docker push faviouz/fleetit-api:latest

docker build -t faviouz/fleetit-alerts alerts
docker push faviouz/fleetit-alerts:latest

docker build -t faviouz/fleetit-elasticsearch monitoring/elasticsearch
docker push faviouz/fleetit-elasticsearch:latest

docker build -t faviouz/fleetit-metricbeat monitoring/metricbeat
docker push faviouz/fleetit-metricbeat:latest

docker build -t faviouz/fleetit-kibana monitoring/kibana
docker push faviouz/fleetit-kibana:latest
