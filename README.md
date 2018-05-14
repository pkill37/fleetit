# broker

## Development

Build all images:

```
./build.sh
```

Start the cluster and containers and pray that the services converge:

```
docker swarm init --force-new-cluster
docker stack deploy -c development.yml fleetit
```

Optionally start a Jenkins agent in all nodes of the cluster:

```
./jenkins.sh
```

Stop the containers and leave the cluster:

```
docker stack rm fleetit
docker swarm leave --force
```
