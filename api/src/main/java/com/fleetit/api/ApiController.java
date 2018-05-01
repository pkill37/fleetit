package com.fleetit.api;

import org.springframework.web.bind.annotation.*;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class ApiController {
    private static final String POSTGRES_URL = "jdbc:postgresql://" + System.getenv("POSTGRES_HOST") + "/" + System.getenv("POSTGRES_DB");
    private static final String POSTGRES_USER = System.getenv("POSTGRES_USER");
    private static final String POSTGRES_PASSWORD = System.getenv("POSTGRES_PASSWORD");

    private static Update getGlobalStats() {
        final String query = "SELECT now() AS timestamp, AVG(lat) AS lat, AVG(lng) AS lng, AVG(co2) AS co2, AVG(temp) AS temp, AVG(heart_rate) AS heart_rate, AVG(battery) AS battery, AVG(speed) AS speed FROM updates";
        Update u = null;

        try (Connection con = DriverManager.getConnection(POSTGRES_URL, POSTGRES_USER, POSTGRES_PASSWORD)) {
            try (PreparedStatement pst = con.prepareStatement(query)) {
                try (ResultSet rs = pst.executeQuery()) {
                    while (rs.next()) {
                        u = new Update(0, rs.getTimestamp("timestamp"), rs.getDouble("lat"), rs.getDouble("lng"), rs.getInt("co2"), rs.getDouble("temp"), rs.getInt("heart_rate"), rs.getDouble("battery"), rs.getDouble("speed"));
                        System.out.println(u);
                    }
                }
            }
        } catch (SQLException ex) {
            Logger.getLogger(ApiController.class.getName()).log(Level.SEVERE, ex.getMessage(), ex);
        }

        return u;
    }

    private static Update getBikeStats(int bikeId) {
        final String query = "SELECT bike_id, now() AS timestamp, AVG(lat) AS lat, AVG(lng) AS lng, AVG(co2) AS co2, AVG(temp) AS temp, AVG(heart_rate) AS heart_rate, AVG(battery) AS battery, AVG(speed) AS speed FROM updates WHERE bike_id = ? GROUP BY bike_id";
        Update u = null;

        try (Connection con = DriverManager.getConnection(POSTGRES_URL, POSTGRES_USER, POSTGRES_PASSWORD)) {
            try (PreparedStatement pst = con.prepareStatement(query)) {
                pst.setInt(1, bikeId);
                try (ResultSet rs = pst.executeQuery()) {
                    while (rs.next()) {
                        u = new Update(rs.getInt("bike_id"), rs.getTimestamp("timestamp"), rs.getDouble("lat"), rs.getDouble("lng"), rs.getInt("co2"), rs.getDouble("temp"), rs.getInt("heart_rate"), rs.getDouble("battery"), rs.getDouble("speed"));
                        System.out.println(u);
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

        try (Connection con = DriverManager.getConnection(POSTGRES_URL, POSTGRES_USER, POSTGRES_PASSWORD)) {
            try (PreparedStatement pst = con.prepareStatement(query)) {
                pst.setInt(1, bikeId);
                pst.setInt(2, days);
                try (ResultSet rs = pst.executeQuery()) {
                    while (rs.next()) {
                        Update u = new Update(rs.getInt("bike_id"), rs.getTimestamp("timestamp"), rs.getDouble("lat"), rs.getDouble("lng"), rs.getInt("co2"), rs.getDouble("temp"), rs.getInt("heart_rate"), rs.getDouble("battery"), rs.getDouble("speed"));
                        System.out.println(u);
                        updates.add(u);
                    }
                }
            }
        } catch (SQLException ex) {
            Logger.getLogger(ApiController.class.getName()).log(Level.SEVERE, ex.getMessage(), ex);
        }

        return updates;
    }

    @GetMapping("/stats")
    @ResponseBody
    public Update stats() {
        return getGlobalStats();
    }
    @GetMapping("/bike/{id}/stats")
    @ResponseBody
    public Update stats(@PathVariable("id") int id) {
        return getBikeStats(id);
    }

    @GetMapping("/bike/{id}/last/{days}")
    @ResponseBody
    public List<Update> last(@PathVariable("id") int id, @PathVariable("days") int days) {
        return getLastDaysOfBike(id, days);
    }
}
