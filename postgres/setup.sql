CREATE TABLE updates(
    id SERIAL PRIMARY KEY,
    bike_id INTEGER NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    lat REAL NOT NULL,
    lng REAL NOT NULL,
    co2 INTEGER NOT NULL,
    temp REAL NOT NULL,
    heart_rate INTEGER NOT NULL,
    battery REAL NOT NULL,
    speed REAL NOT NULL
);
