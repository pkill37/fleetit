package com.fleetit.api;

import java.sql.Timestamp;

public class Update {
    public int bikeId;
    public Timestamp timestamp;
    public double lat;
    public double lng;
    public int co2;
    public double temp;
    public int heartRate;
    public double battery;
    public double speed;

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
