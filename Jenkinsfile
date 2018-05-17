node {
    def sensor
    def websocket
    def client
    def postgres
    def api
    def alerts
    def logstash
    def elastisearch
    def metricbeat
    def kibana

    stage('Clone repository') {
        checkout scm
    }

    stage('Build images') {
        sensor = docker.build("fleetit-sensor", "./sensor")
        websocket = docker.build("fleetit-websocket", "./websocket")
        client = docker.build("fleetit-client", "./client")
        postgres = docker.build("fleetit-postgres", "./postgres")
        api = docker.build("fleetit-api", "./api")
        alerts = docker.build("fleetit-alerts", "./alerts")
        logstash = docker.build("fleetit-logstash", "./monitoring/logstash")
        elasticsearch = docker.build("fleetit-elasticsearch", "./monitoring/elasticsearch")
        metricbeat = docker.build("fleetit-metricbeat", "./monitoring/metricbeat")
        kibana = docker.build("fleetit-kibana", "./monitoring/kibana")
    }

    stage('Test images') {
        api.inside {
            sh 'mvn test'
        }

        client.inside {
            sh 'npm test'
        }
    }

    stage('Push images') {
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
            sensor.push("latest")
            websocket.push("latest")
            client.push("latest")
            postgres.push("latest")
            api.push("latest")
            alerts.push("latest")
            logstash.push("latest")
            elasticsearch.push("latest")
            metricbeat.push("latest")
            kibana.push("latest")
        }
    }

    stage('Deploy') {
        sh 'docker stack deploy fleetit -c development.yml'
    }
}
