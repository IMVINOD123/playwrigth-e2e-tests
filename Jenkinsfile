pipeline {
  agent any
  tools {
    nodejs 'Nodejs25'
    allure 'allure'
  }
  options {
    timeout(time: 20, unit: 'MINUTES')
  }
  environment {
    TEST_CREDS = credentials('PW-E2E-Test-User')
    IS_UNIX    = isUnix()
  }
  stages {
    stage('Clean Workspace') {
      steps {
        script {
          if (isUnix()) {
            sh 'rm -rf allure-results allure-report node_modules'
          } else {
            bat '''
              if exist allure-results rmdir /s /q allure-results
              if exist allure-report  rmdir /s /q allure-report
              if exist node_modules   rmdir /s /q node_modules
            '''
          }
        }
      }
    }
    stage('Build') {
      steps {
        script {
          if (isUnix()) {
            sh '''
              npm ci
              npx playwright install --with-deps
            '''
          } else {
            bat '''
              npm ci
              npx playwright install --with-deps chromium
            '''
          }
        }
      }
    }
    stage('Test') {
      steps {
        script {
          if (isUnix()) {
            sh '''
              export TEST_USER_NAME="$TEST_CREDS_USR"
              export TEST_PASSWORD="$TEST_CREDS_PSW"
              npm run e2e:make-appoint
            '''
          } else {
            bat '''
              set TEST_USER_NAME=%TEST_CREDS_USR%
              set TEST_PASSWORD=%TEST_CREDS_PSW%
              npm run e2e:make-appoint
            '''
          }
        }
      }
    }
  }
  post {
    always {
      allure includeProperties: false,
             jdk: '',
             results: [[path: 'allure-results']],
             reportBuildPolicy: 'ALWAYS'
    }
    success {
      echo '✅ Tests passed!'
    }
    failure {
      echo '❌ Tests failed! Check Allure report.'
    }
  }
}