node {
    def sensor
    def websocket
    def clientdev
    def clientprod
    def postgres
    def api
    def alerts
    def elastisearch
    def metricbeat
    def kibana

    stage('Clone repository') {
        checkout scm
    }

    stage('Build images') {
        sensor = docker.build("faviouz/fleetit-sensor", "./sensor")
        websocket = docker.build("faviouz/fleetit-websocket", "./websocket")
        clientdev = docker.build("faviouz/fleetit-client-development", "-f Dockerfile.development ./client")
        clientprod = docker.build("faviouz/fleetit-client-production", "-f Dockerfile.production ./client")
        postgres = docker.build("faviouz/fleetit-postgres", "./postgres")
        api = docker.build("faviouz/fleetit-api", "./api")
        alerts = docker.build("faviouz/fleetit-alerts", "./alerts")
        elasticsearch = docker.build("faviouz/fleetit-elasticsearch", "./monitoring/elasticsearch")
        metricbeat = docker.build("faviouz/fleetit-metricbeat", "./monitoring/metricbeat")
        kibana = docker.build("faviouz/fleetit-kibana", "./monitoring/kibana")
    }

    stage('Test images') {
        api.inside {
            sh 'echo "Running tests..."'
        }

        client.inside {
            sh 'echo "Running tests..."'
        }
    }

    stage('Push images') {
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
            sensor.push("latest")
            websocket.push("latest")
            clientdev.push("latest")
            clientprod.push("latest")
            postgres.push("latest")
            api.push("latest")
            alerts.push("latest")
            elasticsearch.push("latest")
            metricbeat.push("latest")
            kibana.push("latest")
        }
    }

    stage('Deploy') {
        sh 'docker stack deploy fleetit -c development.yml'
    }
}
