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
        sensor = docker.build("fleetit-sensor", "./sensor")
        websocket = docker.build("fleetit-websocket", "./websocket")
        clientdev = docker.build("fleetit-client-development", "-f client/Dockerfile.development ./client")
        clientprod = docker.build("fleetit-client-production", "-f client/Dockerfile.production ./client")
        postgres = docker.build("fleetit-postgres", "./postgres")
        api = docker.build("fleetit-api", "./api")
        alerts = docker.build("fleetit-alerts", "./alerts")
        elasticsearch = docker.build("fleetit-elasticsearch", "./monitoring/elasticsearch")
        metricbeat = docker.build("fleetit-metricbeat", "./monitoring/metricbeat")
        kibana = docker.build("fleetit-kibana", "./monitoring/kibana")
    }

    stage('Test images') {
        sh './wait-for websocket:9999 -- ./wait-for api:8080 -- echo "Services are up! Starting tests..."'

        sh 'ls && pwd && cd api && docker service rm fleetit-mvntest && docker service create --name fleetit-mvntest --network fleetit_default -w="/app" -u root --mount "type=bind,source=$PWD,target=/app" maven:3.5-jdk-9-slim mvn test || true'

        clientdev.inside {
            sh 'cd client && npm install && npm test'
        }
    }

    stage('Deploy') {
        sh 'docker service update fleetit_sensor'
        sh 'docker service update fleetit_websocket'
        sh 'docker service update fleetit_client'
        sh 'docker service update fleetit_postgres'
        sh 'docker service update fleetit_api'
        sh 'docker service update fleetit_alerts'
        sh 'docker service update fleetit_elasticsearch'
        sh 'docker service update fleetit_metricbeat'
        sh 'docker service update fleetit_kibana'
    }
}
