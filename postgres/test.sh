#! /bin/bash
psql -h localhost -p 5432 -U root -d fleetit -c "select * from updates;"
