#! /usr/bin/env bash

set -euo pipefail

docker tag fleetit-jenkins faviouz/fleetit-jenkins:latest
docker push faviouz/fleetit-jenkins:latest

docker tag fleetit-sensor faviouz/fleetit-sensor:latest
docker push faviouz/fleetit-sensor:latest

docker tag fleetit-websocket faviouz/fleetit-websocket:latest
docker push faviouz/fleetit-websocket:latest

docker tag fleetit-client-development faviouz/fleetit-client-development:latest
docker push faviouz/fleetit-client-development:latest

docker tag fleetit-client-production faviouz/fleetit-client-production:latest
docker push faviouz/fleetit-client-production:latest

docker tag fleetit-postgres faviouz/fleetit-postgres:latest
docker push faviouz/fleetit-postgres:latest

docker tag fleetit-api faviouz/fleetit-api:latest
docker push faviouz/fleetit-api:latest

docker tag fleetit-alerts faviouz/fleetit-alerts:latest
docker push faviouz/fleetit-alerts:latest

docker tag fleetit-elasticsearch faviouz/fleetit-elasticsearch:latest
docker push faviouz/fleetit-elasticsearch:latest

docker tag fleetit-metricbeat faviouz/fleetit-metricbeat:latest
docker push faviouz/fleetit-metricbeat:latest

docker tag fleetit-kibana faviouz/fleetit-kibana:latest
docker push faviouz/fleetit-kibana:latest

docker tag fleetit-import_dashboards faviouz/fleetit-import_dashboards:latest
docker push faviouz/fleetit-import_dashboards:latest
