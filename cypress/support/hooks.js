/// <reference types="Cypress" />
import { afterEach, beforeEach } from 'mocha'
export let typeUrl

beforeEach(() => {
    try {
      const urlEnv = Cypress.env('ENVIRONMENT')
  
      switch (urlEnv) {
        case 'local':
          typeUrl = Cypress.config().baseUrlLocal
          break
          case 'hml':
          typeUrl = Cypress.config().baseUrlHml
          break
        case 'prd':
          typeUrl = Cypress.config().baseUrlPrd
          break
        default:
          cy.log(`Não foi apresentado a URL de acesso: ${urlEnv}`)
          break
      }
    } catch (error) {
      return `Não foi apresentado a URL de acesso: ${error.message}`
    }
  })

  afterEach(() => {
    cy.clearLocalStorage()
})
