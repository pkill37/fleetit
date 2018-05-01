#! /bin/bash
curl -X GET -H "Accept: application/json" http://localhost:8080/api/v1/bike/$1/stats
printf "\n\n"
curl -X GET -H "Accept: application/json" http://localhost:8080/api/v1/bike/$1/last/30
printf "\n\n"
curl -X GET -H "Accept: application/json" http://localhost:8080/api/v1/stats
