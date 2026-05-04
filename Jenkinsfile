pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                echo 'Code cloned from GitHub'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t codealpha-tasks .'
            }
        }

        stage('Run Container') {
            steps {
                bat 'docker rm -f codealpha-container || exit 0'
                bat 'docker run -d --name codealpha-container -p 8081:80 codealpha-tasks'
            }
        }
    }
}
