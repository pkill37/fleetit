package com.fleetit.api;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/v1")
public class ApiController {
    public static class Update {
        private int bikeId;
        private Timestamp timestamp;
        private double lat;
        private double lng;
        private int co2;
        private double temp;
        private int heartRate;
        private double battery;
        private double speed;

        public Update(int bikeId, Timestamp timestamp, double lat, double lng, int co2, double temp, int heartRate, double battery, double speed) {
            this.bikeId = bikeId;
            this.timestamp = timestamp;
            this.lat = lat;
            this.lng = lng;
            this.co2 = co2;
            this.temp = temp;
            this.heartRate = heartRate;
            this.battery = battery;
            this.speed = speed;
        }

        @Override
        public String toString() {
            return "Update{" +
                    "bikeId=" + bikeId +
                    ", timestamp=" + timestamp +
                    ", lat=" + lat +
                    ", lng=" + lng +
                    ", co2=" + co2 +
                    ", temp=" + temp +
                    ", heartRate=" + heartRate +
                    ", battery=" + battery +
                    ", speed=" + speed +
                    '}';
        }
    }

    // TODO: refactor to environment variables
    private static final String POSTGRES_URL = "jdbc:postgresql://postgres/fleetit";
    private static final String POSTGRES_USER = "root";
    private static final String POSTGRES_PASS = "demo1234";

    private static Update getBikeStats(int bikeId) {
        final String query = "SELECT bike_id, AVG(lat), AVG(lng), AVG(co2), AVG(temp), AVG(heart_rate), AVG(battery), AVG(speed) FROM updates WHERE bike_id = ? GROUP BY bike_id";
        Update u = null;

        try (Connection con = DriverManager.getConnection(POSTGRES_URL, POSTGRES_USER, POSTGRES_PASS)) {
            try (PreparedStatement pst = con.prepareStatement(query)) {
                pst.setInt(1, bikeId);
                try (ResultSet rs = pst.executeQuery()) {
                    while (rs.next()) {
                        u = new Update(rs.getInt("bike_id"), rs.getTimestamp("timestamp"), rs.getDouble("lat"), rs.getDouble("lng"), rs.getInt("co2"), rs.getDouble("temp"), rs.getInt("heart_rate"), rs.getDouble("battery"), rs.getDouble("speed"));
                        System.out.print(u);
                    }
                }
            }
        } catch (SQLException ex) {
            Logger.getLogger(ApiController.class.getName()).log(Level.SEVERE, ex.getMessage(), ex);
        }

        return u;
    }

    private static List<Update> getLastDaysOfBike(int bikeId, int days) {
        final String query = "SELECT * FROM updates WHERE bike_id = ? ORDER BY timestamp LIMIT ?";
        List<Update> updates = new ArrayList<>();

        try (Connection con = DriverManager.getConnection(POSTGRES_URL, POSTGRES_USER, POSTGRES_PASS)) {
            try (PreparedStatement pst = con.prepareStatement(query)) {
                pst.setInt(1, bikeId);
                pst.setInt(2, days);
                try (ResultSet rs = pst.executeQuery()) {
                    while (rs.next()) {
                        Update u = new Update(rs.getInt("bike_id"), rs.getTimestamp("timestamp"), rs.getDouble("lat"), rs.getDouble("lng"), rs.getInt("co2"), rs.getDouble("temp"), rs.getInt("heart_rate"), rs.getDouble("battery"), rs.getDouble("speed"));
                        System.out.print(u);
                        updates.add(u);
                    }
                }
            }
        } catch (SQLException ex) {
            Logger.getLogger(ApiController.class.getName()).log(Level.SEVERE, ex.getMessage(), ex);
        }

        return updates;
    }

    @RequestMapping(value = "/bike/{id}/stats", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @JsonSerialize
    public ResponseEntity<Update> stats(@PathVariable("id") int id) {
        return ResponseEntity.ok(getBikeStats(id));
    }

    @RequestMapping(value = "/bike/{id}/last/{days}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<List<Update>> last(@PathVariable("id") int id, @PathVariable("days") int days) {
        return ResponseEntity.ok(getLastDaysOfBike(id, days));
    }
}
