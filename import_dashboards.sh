#!/bin/bash

KIBANAURL="http://127.0.0.1:5601"


# Import searches
for sch in ./customDashboards/searches/*; do
    ./customDashboards/kibana-importer/kibana-importer.py --json $sch --kibana-url $KIBANAURL
done

# Import visualizations
for vis in ./customDashboards/visualizations/*; do
    ./customDashboards/kibana-importer/kibana-importer.py --json $vis --kibana-url $KIBANAURL
done

# Import dashboards
for dash in ./customDashboards/dashboards/*; do
    ./customDashboards/kibana-importer/kibana-importer.py --json $dash --kibana-url $KIBANAURL
done
