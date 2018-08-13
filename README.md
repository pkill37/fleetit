# fleetit

![](https://i.imgur.com/ljbMfoM.png?3) ![](https://i.imgur.com/6i9OaXP.png?4) ![](https://i.imgur.com/Pmfx3Vh.png?3)

Fleetit is a bike tracking web application where one can monitor and be alerted about speed, temperature, CO2 levels, etc. of bikes on a live-updated map. It was developed as an exercise in Software Engineering where various technologies and methodologies (Docker, Docker Swarm, Kafka, Zookeeper, PostgreSQL, ELK, Metricbeat, NGINX, React, SpringBoot, TDD, NodeJS, WebSocket, Python) come into play in an event-driven architecture.

The entire project is designed to run on a Docker Swarm cluster (enabling easy scalability, replication, zero-downtime deployments, fault tolerance, load balancing) with separate development and production stacks that was eventually deployed on 5 DigitalOcean virtual machines for a proof-of-concept production setup.

## Development

Build all images:

```bash
./build.sh
```

Initialize the cluster:

```bash
docker swarm init
```

Deploy the development stack:

```bash
docker stack deploy -c development.yml fleetit
```

Remove the stack:

```bash
docker stack rm fleetit
```

Leave the cluster:

```bash
docker swarm leave
```

## Production

Configure the DigitalOcean firewall on all nodes of the cluster to allow Docker Swarm traffic:

```bash
./digitalocean_firewall.sh -m
./digitalocean_firewall.sh -w
```

Initialize the cluster from a manager node:

```bash
docker swarm init
```

Join the cluster on all worker nodes:

```bash
docker swarm join --token $TOKEN $MANAGER:2377
```

Deploy the production stack on the cluster from a manager node:

```bash
docker stack deploy -c production.yml fleetit
```

## Documentation

```bash
cd docs/src/
docker run --rm -v "$PWD:/gitbook" -p 4000:4000 billryan/gitbook gitbook serve
```

```bash
cd docs/src/
docker run --rm -v "$PWD:/gitbook" billryan/gitbook gitbook build
rsync -crvz --rsh='ssh' --delete-after --delete-excluded ./_book/* es2017-2018_g201@xcoa.av.it.pt:public_html/docs
```
