#!/bin/bash

KIBANA_URL="http://127.0.0.1:5601"
DASHBOARD_PATH="./monitoring/customDashboards"


# Import searches
for sch in $DASHBOARD_PATH/searches/*; do
    ./customDashboards/kibana-importer/kibana-importer.py --json $sch --kibana-url $KIBANA_URL
done

# Import visualizations
for vis in $DASHBOARD_PATH/visualizations/*; do
    ./customDashboards/kibana-importer/kibana-importer.py --json $vis --kibana-url $KIBANA_URL
done

# Import dashboards
for dash in $DASHBOARD_PATH/dashboards/*; do
    ./customDashboards/kibana-importer/kibana-importer.py --json $dash --kibana-url $KIBANA_URL
done
