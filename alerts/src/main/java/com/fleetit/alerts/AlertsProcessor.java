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

import java.sql.*;
import java.util.Properties;
import java.util.concurrent.CountDownLatch;
import java.util.logging.Level;
import java.util.logging.Logger;

@Component
public class AlertsProcessor implements CommandLineRunner {
    private static final String POSTGRES_URL = "jdbc:postgresql://" + System.getenv("POSTGRES_HOST") + "/" + System.getenv("POSTGRES_DB");
    private static final String POSTGRES_USER = System.getenv("POSTGRES_USER");
    private static final String POSTGRES_PASSWORD = System.getenv("POSTGRES_PASSWORD");

    @Override
    public void run(String... args) throws Exception {
        main(args);
    }

    private static void persist(JsonNode json) {
        String query = "INSERT INTO updates(bike_id, timestamp, lat, lng, co2, temp, heart_rate, battery, speed) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";

        int bikeId = json.get("bike_id").asInt();
        Timestamp timestamp = Timestamp.valueOf(json.get("timestamp").asText());
        double lat = json.get("lat").asDouble();
        double lng = json.get("lng").asDouble();
        int co2 = json.get("co2").asInt();
        double temp = json.get("temp").asDouble();
        int heartRate = json.get("heart_rate").asInt();
        double battery = json.get("battery").asInt();
        double speed = json.get("speed").asInt();

        try (Connection con = DriverManager.getConnection(POSTGRES_URL, POSTGRES_USER, POSTGRES_PASSWORD);
             PreparedStatement pst = con.prepareStatement(query)) {
            pst.setInt(1, bikeId);
            pst.setTimestamp(2, timestamp);
            pst.setDouble(3, lat);
            pst.setDouble(4, lng);
            pst.setInt(5, co2);
            pst.setDouble(6, temp);
            pst.setInt(7, heartRate);
            pst.setDouble(8, battery);
            pst.setDouble(9, speed);
            pst.executeUpdate();
        } catch (SQLException ex) {
            Logger.getLogger(AlertsProcessor.class.getName()).log(Level.SEVERE, ex.getMessage(), ex);
        }
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
        KStream<String, JsonNode> heartRateAlerts = updates.filter((k, v) -> v.get("heart_rate").asInt() > 85);
        KStream<String, JsonNode> batteryAlerts = updates.filter((k, v) -> v.get("battery").asDouble() < 50.0);

        // Persist updates to PostgreSQL
        updates.foreach((k, v) -> persist(v));

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
