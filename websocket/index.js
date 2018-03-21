'use strict';
const KafkaProxy = require('kafka-proxy');

let kafkaProxy = new KafkaProxy({
    wsPort: 9999,
    kafka: 'kafka1:9092/',
});

kafkaProxy.listen();
