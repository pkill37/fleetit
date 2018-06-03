#! /bin/bash

docker service update --force fleetit_sensor --image faviouz/fleetit-sensor
docker service update --force fleetit_websocket --image faviouz/fleetit-websocket
docker service update --force fleetit_postgres --image faviouz/fleetit-postgres
docker service update --force fleetit_alerts --image faviouz/fleetit-alerts
docker service update --force fleetit_api --image faviouz/fleetit-api
docker service update --force fleetit_elasticsearch --image faviouz/fleetit-elasticsearch
docker service update --force fleetit_metricbeat --image faviouz/fleetit-metricbeat
docker service update --force fleetit_kibana --image faviouz/fleetit-kibana
docker service update --force fleetit_client --image faviouz/fleetit-client
