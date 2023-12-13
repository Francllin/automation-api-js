def SetPath(nodejsversion) {
  return sh (script: ". nvmuse " + nodejsversion,returnStdout: true).trim()
}

pipeline {
  agent { node { label 'linux && nodejs' } }

  environment {
    PROJECT_NAME = "automation-api-js"

    SLACK_CHANNEL = ""

    DOCKER_USER_PASS = ""
    DOCKER_REPOSITORY = ""
    DOCKER_USER_LOGIN = ""

    // NODE CONFIG
    NODEJS_VERSION = 'v14.17'
    NODE_PATH = SetPath("${env.NODEJS_VERSION}")

    // STYLES
    ERROR_COLOR = '#E74C3C'
    INFO_COLOR = '#3498DB'
    SUCCESS_COLOR = '#2ECC71'
    ALERT_COLOR = '#fffb1b'
    
    // mensagens
    MENSAGEM_ERRO = "*Testes FAILURE. Valor do totatl dos testes foi menor do que esperado no Quality Gate. Verifique o que ocorreu no Terminal*"
  }

  options {
    timeout(time: 2, unit: 'HOURS')
  }

  stages {
    stage('Notify start Slack') {
      steps {
        script {
          echo "valor QG QA ${env.PORCENTAGEM_QG_QA}"
          env.GIT_COMMIT_MSG = sh (script: 'git log -1 --pretty=%B ${GIT_COMMIT}', returnStdout: true).trim()
        }
        slackSend(color: "${env.INFO_COLOR}", message: "*RODANDO OS TESTES* :rocket:\n\n*Projeto:* ${env.PROJECT_NAME}\n*Build:* ${env.BUILD_URL}\n*Ambiente:* `${env.GIT_BRANCH}`\n*Commit Message:*\n\n'${env.GIT_COMMIT_MSG}'", channel: "#${env.SLACK_CHANNEL}")
      }
    }

    stage('Get env') {
      steps {
        parallel(
          'Set environment': {
            script {
              env.PREVIOUS = env.BUILD_NUMBER - 1
              env.DOCKER_BUILD_TAG = "$DOCKER_REPOSITORY/$PROJECT_NAME"
            }
          },

          'Login at docker': {
            sh '''
              set +x
              docker login $DOCKER_REPOSITORY -u $DOCKER_USER_LOGIN -p $DOCKER_USER_PASS
              set -x
            '''
          },
        )
      }
    }
    
    stage('Get cache') {
      steps {
        sh '''
          docker pull $DOCKER_PREVIUS_BUILD_TAG || echo "Docker pull fail"
        '''
      }
    }

    stage('Docker build') {
      steps {
        sh """
          docker build -t $DOCKER_BUILD_TAG . -f Dockerfile
        """
      }
    }

    stage('Push docker') {
      steps {
        sh '''docker push $DOCKER_BUILD_TAG'''
      }
    }
    
    stage('Test: QA API') {
      steps {
        catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
         echo 'rodar os teste de API'
         sh """
           docker run --rm --network host \
           -v ${PWD}/workspace/NAC/$PROJECT_NAME/allure-results:/$PROJECT_NAME/allure-results \
           -v ${PWD}/workspace/NAC/$PROJECT_NAME/valorQG:/$PROJECT_NAME/valorQG \
           -e DISPLAY \
           -e BUILD_NUMBER="${env.BUILD_NUMBER}" \
           -i $DOCKER_BUILD_TAG \
           npm run cypress:run
         """
        }
      }
    }
    
    stage('Quality Gate - Report') {
      steps {
        script {
          allure([
            includeProperties: false,
            jdk: '',
            properties: [],
            reportBuildPolicy: 'ALWAYS',
            results: [[path: '/allure-results']]
          ])
        }
      }
    }
  }
  
  post {
      always {
      slackSend(color: "${env.ALERT_COLOR}", message: "*Testes Finalizado com SUCCESS. Analise os Erros no relatório no canal do slack* #jp_canaldoconsultor_tests :white_check_mark:\n\n*Projeto:* ${env.PROJECT_NAME}\n*Build:* ${env.BUILD_URL}\n*Ambiente:* `${env.GIT_BRANCH}`", channel: "#${env.SLACK_CHANNEL}")
    }
     success {
        slackSend(color: "${env.SUCCESS_COLOR}", message: "*Testes Finalizado com SUCCESS!* :white_check_mark::deployparrot::tada:\n\n*Projeto:* ${env.PROJECT_NAME}\n*Build:* ${env.BUILD_URL}\n*Ambiente:* `${env.GIT_BRANCH}`", channel: "#${env.SLACK_CHANNEL}")
     }
     failure {
        slackSend(color: "${env.ERROR_COLOR}", message: "${env.MENSAGEM_ERRO} :-1::x:\n\n*Projeto:* ${env.PROJECT_NAME}\n*Build:* ${env.BUILD_URL}\n*Ambiente:* `${env.GIT_BRANCH}`\n*Message de Erro:*\n\n'${env.BUILD_FAILED_MESSAGE}'", channel: "#${env.SLACK_CHANNEL}")
     }
  }
}