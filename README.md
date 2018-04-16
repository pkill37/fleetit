# broker

## Development

```
./run.sh
```

Test websocket

```
wscat --connect "ws://localhost:9999/?topic=updates"
wscat --connect "ws://localhost:9999/?topic=alerts"
```

## Deployment

Kubernetes

## TODO

- https://kubernetes.io/docs/getting-started-guides/minikube/
- run mvn package separetely to cache package dependency downloads
