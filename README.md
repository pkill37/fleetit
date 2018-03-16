# broker

## Development

Start 2 replicas of Kafka containers

```
docker-compose up --scale kafka=2
```

Open a shell for an example producer

```
./start-kafka-shell.sh 172.17.0.1 172.17.0.1:2181
$KAFKA_HOME/bin/kafka-console-producer.sh --topic=topic2 --broker-list=`broker-list.sh`
```

Open a shell for an example consumer

```
./start-kafka-shell.sh 172.17.0.1 172.17.0.1:2181
$KAFKA_HOME/bin/kafka-console-consumer.sh --topic=topic2 --zookeeper=$ZK
```

## TODO

- https://kubernetes.io/docs/getting-started-guides/minikube/
