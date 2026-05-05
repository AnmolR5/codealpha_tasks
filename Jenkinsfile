pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                echo 'Cloning repo...'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build --no-cache -t codealpha-tasks .'
            }
        }

        stage('Run Container') {
            steps {
                bat 'docker stop codealpha-container || exit 0'
                bat 'docker rm codealpha-container || exit 0'
                bat 'docker run -d -p 8081:80 --name codealpha-container codealpha-tasks'
            }
        }
    }
}
