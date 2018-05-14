# broker

## Development

Start the cluster and containers and pray that the services converge:

```
docker swarm init --force-new-cluster
docker stack deploy -c development.yml fleetit
```

Optionally start a Jenkins agent in all nodes of the cluster:

```
mkdir -p jenkins
docker service create --name jenkins \
    -p 8082:8080 \
    -p 50000:50000 \
    -e JENKINS_OPTS="--prefix=/jenkins" \
    --mount "type=bind,source=$PWD/jenkins,target=/var/jenkins_home" \
    --reserve-memory 300m \
    jenkins
```

Stop the containers and leave the cluster:

```
docker stack rm fleetit
docker swarm leave --force
```

