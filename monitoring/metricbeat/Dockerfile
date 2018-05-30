# https://github.com/beats/metricbeat-docker
FROM docker.elastic.co/beats/metricbeat:6.2.4

COPY  ./config/metricbeat.yml /usr/share/metricbeat/metricbeat.yml

USER root
RUN chown root:root /usr/share/metricbeat/metricbeat.yml
USER metric

