pipeline {

    agent any
    
    stages{

        stage('Build'){
            steps{
                echo 'Building...'             
                git credentialsId: 'git_credentials', url: 'https://github.com/bhajduk/delta-chat'
                dir('Docker'){
                    
                    sh '''
                        curl -L "https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m)" -o ~/docker-compose
                        chmod +x ~/docker-compose
                        ~/docker-compose up -d build-agent
                    ''' 
                }
            }
            
            post {
                    success {
                    	echo 'build success'
                        emailext attachLog: true, 
                            body: "Build status: ${currentBuild.currentResult}, Job: ${env.JOB_NAME}", 
                            recipientProviders: [developers()], 
                            subject: 'Build stage passed', 
                            to: 'unival12@gmail.com'
                    }

                    failure {
                    	echo 'build failure'
                        emailext attachLog: true, 
                            body: "Build status: ${currentBuild.currentResult}, Job: ${env.JOB_NAME}", 
                            recipientProviders: [developers()], 
                            subject: 'Build stage failed', 
                            to: 'unival12@gmail.com'
                    }
                }
        }
        
        stage('Test') {      
            steps{         
                echo 'Testing...'
                dir('Docker'){
                    sh '~/docker-compose up -d test-agent'
                }
            }
            
            post {
                success {
                	echo 'test success'
                    emailext attachLog: true, 
                        body: "Test status: ${currentBuild.currentResult}, Job ${env.JOB_NAME}", 
                        recipientProviders: [developers()], 
                        subject: 'Test stage passed', 
                        to: 'unival12@gmail.com'
                }

                failure {
                	echo 'test failure'
                    emailext attachLog: true, 
                        body: "Test status: ${currentBuild.currentResult}, Job ${env.JOB_NAME}", 
                        recipientProviders: [developers()], 
                        subject: 'Test stage failed', 
                        to: 'unival12@gmail.com'
                }
            }
        }
        
        stage('Deploy') {      
            steps{         
                echo 'Deploying...'
                dir('Docker'){
                    sh 'docker tag chat:latest bhajduk/chat:latest'
                    sh 'docker save -o ./chatBuild.tar bhajduk/chat:latest'
                    sh 'docker build -t ubuntu-deploy -f Dockerfile-ubuntu .' 
                }
            }
            
            post {
                success {
                	echo 'deploy success'
                    emailext attachLog: true, 
                        body: "Deploy status: ${currentBuild.currentResult}, Job ${env.JOB_NAME}", 
                        recipientProviders: [developers()], 
                        subject: 'Test stage passed', 
                        to: 'unival12@gmail.com'
                }

                failure {
                	echo 'deploy failure'
                    emailext attachLog: true, 
                        body: "Deploy status: ${currentBuild.currentResult}, Job ${env.JOB_NAME}", 
                        recipientProviders: [developers()], 
                        subject: 'Test stage failed', 
                        to: 'unival12@gmail.com'
                }
            }
        }
    }

    post {
        success {
        	echo 'pipeline success'
            emailext attachLog: true, 
                body: "Pipeline status: ${currentBuild.currentResult}, Job ${env.JOB_NAME}", 
                recipientProviders: [developers()], 
                subject: 'Whole pipeline passed', 
                to: 'unival12@gmail.com'
        }

        failure {
        	echo 'pipeline failure'
            emailext attachLog: true, 
                body: "Pipeline status: ${currentBuild.currentResult}, Job ${env.JOB_NAME}", 
                recipientProviders: [developers()], 
                subject: 'Whole pipeline failed', 
                to: 'unival12@gmail.com'
        }
    }
}
