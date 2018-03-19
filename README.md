# broker

## Development

```
docker-compose down --volumes && docker-compose up --build
```
## Client

Create a consumer

```
curl -X POST -H "Content-Type: application/vnd.kafka.v2+json" -H "Accept: application/vnd.kafka.v2+json" --data '{"name": "my_consumer_instance", "format": "json", "auto.offset.reset": "earliest"}' http://localhost:8082/consumers/my_json_consumer
```

Subscribe to the topic

```
curl -X POST -H "Content-Type: application/vnd.kafka.v2+json" --data '{"topics":["test"]}' http://localhost:8082/consumers/my_json_consumer/instances/my_consumer_instance/subscription
```

Consume data periodically

```
curl -X GET -H "Accept: application/vnd.kafka.json.v2+json" http://localhost:8082/consumers/my_json_consumer/instances/my_consumer_instance/records
```

## TODO

- https://kubernetes.io/docs/getting-started-guides/minikube/

