'use strict';
const KafkaProxy = require('kafka-proxy');

let kafkaProxy = new KafkaProxy({
    wsPort: 9999,
    kafka: process.env.KAFKA_BROKERS,
});

kafkaProxy.listen();
