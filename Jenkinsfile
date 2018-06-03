node {
    stage('Clone repository') {
        checkout scm
    }

    stage('Build images') {
        sh './build.sh'
    }

    stage('Test images') {
        sh './wait-for zookeeper:22181 -- ./wait-for kafka:19092 -- ./wait-for websocket:9999 -- ./wait-for postgres:5432 -- ./wait-for api:8080 -- echo "Services are up"'
        sh 'docker run --network fleetit_network -w /app -v $PWD/client:/app node:alpine sh -c "npm install && npm test"'
        sh 'docker run --network fleetit_network -w /app -v $PWD/api:/app maven:3.5-jdk-9-slim sh -c "mvn test"'
    }

    stage('Deploy images') {
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

    post {
        always {
            sh 'docker system prune -af'
        }
    }
}
