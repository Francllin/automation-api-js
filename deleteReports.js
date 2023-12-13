const fs = require('fs')

// Deletar a pasta report para novos testes
fs.rmdirSync('./allure-report', { recursive: true })
fs.rmdirSync('./cypress/screenshots', { recursive: true })
fs.rmdirSync('./allure-results', { recursive: true })


