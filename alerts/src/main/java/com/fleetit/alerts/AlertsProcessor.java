package com.fleetit.alerts;

import com.fasterxml.jackson.databind.JsonNode;
import org.apache.kafka.common.serialization.Deserializer;
import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.common.serialization.Serializer;
import org.apache.kafka.connect.json.JsonDeserializer;
import org.apache.kafka.connect.json.JsonSerializer;
import org.apache.kafka.streams.*;
import org.apache.kafka.streams.kstream.KStream;
import org.apache.kafka.streams.kstream.Produced;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Properties;
import java.util.concurrent.CountDownLatch;

@Component
public class AlertsProcessor implements CommandLineRunner {
    @Override
    public void run(String... args) throws Exception {
        main(args);
    }

    public static void main(String[] args) {
        Serializer<JsonNode> jsonSerializer = new JsonSerializer();
        Deserializer<JsonNode> jsonDeserializer = new JsonDeserializer();
        Serde<JsonNode> jsonSerde = Serdes.serdeFrom(jsonSerializer, jsonDeserializer);

        Properties props = new Properties(null);
        props.put(StreamsConfig.APPLICATION_ID_CONFIG, "fleetit-alerts");
        props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, System.getenv("KAFKA_CLUSTER"));
        StreamsConfig streamsConfig = new StreamsConfig(props);

        StreamsBuilder builder = new StreamsBuilder();

        KStream<String, JsonNode> updates = builder.stream("updates", Consumed.with(Serdes.String(), jsonSerde));
        KStream<String, JsonNode> speedAlerts = updates.filter((k, v) -> v.get("speed").asDouble() > 5.0);
        KStream<String, JsonNode> heartRateAlerts = updates.filter((k, v) -> v.get("heart_rate").asInt() > 90);
        KStream<String, JsonNode> batteryAlerts = updates.filter((k, v) -> v.get("battery").asDouble() <= 20.0);

        speedAlerts.to("alerts-speed", Produced.with(Serdes.String(), jsonSerde));
        heartRateAlerts.to("alerts-heart-rate", Produced.with(Serdes.String(), jsonSerde));
        batteryAlerts.to("alerts-battery", Produced.with(Serdes.String(), jsonSerde));

        Topology topology = builder.build();
        KafkaStreams streams = new KafkaStreams(topology, streamsConfig);
        CountDownLatch latch = new CountDownLatch(1);

        // attach shutdown handler to catch control-c
        Runtime.getRuntime().addShutdownHook(new Thread("streams-shutdown-hook") {
            @Override
            public void run() {
                streams.close();
                latch.countDown();
            }
        });

        try {
            streams.start();
            latch.await();
        } catch (Throwable e) {
            System.exit(1);
        }
        System.exit(0);
    }
}
