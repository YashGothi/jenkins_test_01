pipeline {
    agent any

    environment {
        IMAGE_NAME = 'jenkins-demo-app'
        IMAGE_TAG  = "${env.BUILD_NUMBER}"
        CONTAINER_NAME = 'jenkins-demo-app-container'
        APP_PORT = '3000'
    }

    stages {

        stage('Checkout') {
            steps {
                // Pulls the source code from the repo this Jenkinsfile lives in
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                // "Build" here = build the Docker image containing the app
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

        stage('Test') {
            steps {
                // Runs the Jest test suite; jest-junit writes reports/junit.xml
                sh 'npm test'
            }
            post {
                always {
                    // Publishes results so Jenkins shows pass/fail trends in the UI
                    junit 'reports/junit.xml'
                }
            }
        }

        stage('Deploy') {
            steps {
                // Simple local deploy: stop any old container, run the new image.
                // In a real setup you'd push IMAGE_NAME:IMAGE_TAG to a registry
                // (Docker Hub / ECR / GCR) here and deploy to a remote host or
                // Kubernetes cluster instead of running on the Jenkins agent itself.
                sh """
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                    docker run -d --name ${CONTAINER_NAME} -p ${APP_PORT}:3000 ${IMAGE_NAME}:${IMAGE_TAG}
                """
            }
        }

        stage('Smoke Test') {
            steps {
                // Confirms the deployed container is actually responding
                sh """
                    sleep 3
                    curl --fail http://localhost:${APP_PORT}/health
                """
            }
        }
    }

    post {
        success {
            echo "Pipeline succeeded: ${IMAGE_NAME}:${IMAGE_TAG} is deployed and healthy."
        }
        failure {
            echo 'Pipeline failed. Check the stage logs above for details.'
        }
    }
}
