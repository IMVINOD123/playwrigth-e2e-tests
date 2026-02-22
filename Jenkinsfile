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
    // ✅ Force browsers to install in workspace instead of system profile
    PLAYWRIGHT_BROWSERS_PATH = "${WORKSPACE}\\pw-browsers"
  }
  stages {
    stage('Clean Workspace') {
      steps {
        bat '''
          if exist allure-results rmdir /s /q allure-results
          if exist allure-report  rmdir /s /q allure-report
          if exist node_modules   rmdir /s /q node_modules
          if exist pw-browsers    rmdir /s /q pw-browsers
        '''
      }
    }
    stage('Build') {
      steps {
        bat '''
          npm ci
        '''
      }
    }
    stage('Install Browsers') {
      steps {
        bat '''
          echo Installing Playwright browsers to: %PLAYWRIGHT_BROWSERS_PATH%
          npx playwright install --with-deps chromium
        '''
      }
    }
    stage('Test') {
      steps {
        bat '''
          set TEST_USER_NAME=%TEST_CREDS_USR%
          set TEST_PASSWORD=%TEST_CREDS_PSW%
          npm run e2e:make-appoint
        '''
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
