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
        logstash = docker.build("fleetit-logstash", "./logstash")
        elasticsearch = docker.build("fleetit-elasticsearch", "./elasticsearch")
        metricbeat = docker.build("fleetit-metricbeat", "./metricbeat")
        kibana = docker.build("fleetit-kibana", "./kibana")
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
            api.push("${env.BUILD_NUMBER}")
            api.push("latest")
        }
    }

    stage('Deploy') {
        sh 'docker stack deploy fleetit -c development.yml'
    }
}
