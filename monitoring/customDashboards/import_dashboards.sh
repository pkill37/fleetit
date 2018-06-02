#!/bin/bash

set -euo pipefail

KIBANA_URL="http://kibana:5601"

# Import searches
for sch in searches/*; do
    ./kibana-importer/kibana-importer.py --json $sch --kibana-url $KIBANA_URL
done

# Import visualizations
for vis in visualizations/*; do
    ./kibana-importer/kibana-importer.py --json $vis --kibana-url $KIBANA_URL
done

# Import dashboards
for dash in dashboards/*; do
    ./kibana-importer/kibana-importer.py --json $dash --kibana-url $KIBANA_URL
done
