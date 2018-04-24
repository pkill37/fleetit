# broker

## Development

Without monitoring

```
./run.sh
```

With monitoring

```
./run.sh -m
```

Test websocket

```
wscat --connect "ws://localhost:9999/?topic=updates"
wscat --connect "ws://localhost:9999/?topic=alerts-speed"
```

## Deployment

Kubernetes

## TODO

- https://kubernetes.io/docs/getting-started-guides/minikube/
- run mvn package separetely to cache package dependency downloads
