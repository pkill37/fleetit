# fleetit

## Development

Build all images:

```
./build.sh
```

Initialize the cluster:

```
docker swarm init
```

Deploy the development stack:

```
docker stack deploy -c development.yml fleetit
```

Remove the stack:

```
docker stack rm fleetit
```

Leave the cluster:

```
docker swarm leave
```

## Production

Configure the DigitalOcean firewall on all nodes of the cluster to allow Docker Swarm traffic:

```
./digitalocean_firewall.sh -m
./digitalocean_firewall.sh -w
```

Initialize the cluster from a manager node:

```
docker swarm init
```

Join the cluster on all worker nodes:

```
docker swarm join --token $TOKEN $MANAGER:2377
```

Deploy the production stack on the cluster from a manager node:

```
docker stack deploy -c production.yml fleetit
```
