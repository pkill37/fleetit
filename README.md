# broker

## Development

```
docker-compose down --volumes
docker-compose up zookeeper-1 zookeeper-2 zookeeper-3 kafka-1 kafka-2 kafka-3
docker-compose up --build --scale sensor=50 sensor
docker-compose up --build websocket
docker-compose up --build client
```

## Deployment

Kubernetes

## TODO

- https://kubernetes.io/docs/getting-started-guides/minikube/
- env variables for all hostnames in app code

