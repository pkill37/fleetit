## Requirements

- Fleet needs (at least) one server with public access to the internet;
- Each bicycle will have sensors attached, which will be monitoring environment variables. These must have internet access;
- When the sensors collect abnormal data about the client or the environment sorrouding him/her, an alert must be triggered, and that same alert must show up on the API dashboard in less than 30 seconds.
- A worker can monitor all bicycles belonging to the bike rental shop.

## Tests

The tests used on our application were, firstly, integration tests (client side), using **Jest** and **Maven** tests. 

These tests include:
- check if the alerts page initializes without the presence of alerts,
- check if the LiveMap initializes with the map and, 
- check if the app runs without crashing.

Secondly, **BDD** (behavior driven development) tests were used in the API, using Cucumber (check if the client receives statistics and history).