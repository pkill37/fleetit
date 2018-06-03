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

    stage('Push images') {
        withDockerRegistry(registry: [credentialsId: 'docker-hub-credentials']) {
            sh './push.sh'
        }
    }

    stage('Deploy images') {
        sh './update.sh'
    }

    stage('Cleanup images') {
        sh 'docker system prune -f'
        deleteDir()
    }
}
