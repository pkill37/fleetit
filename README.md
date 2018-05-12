# broker

## Development

Start the containers and cluster:

```
docker swarm init --force-new-cluster
docker stack deploy -c development.yml fleetit
```

Stop the containers and leave the cluster:

```
docker stack rm fleetit
docker swarm leave --force
```

