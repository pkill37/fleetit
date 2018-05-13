#! /bin/bash
docker exec -it $(docker ps | grep postgres | cut -f 1 -d " ") psql -h 127.0.0.1 -p 5432 -U root -d fleetit -c "select * from updates;"
