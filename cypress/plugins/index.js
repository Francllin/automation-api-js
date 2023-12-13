/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
const cucumber = require('cypress-cucumber-preprocessor').default
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = (on, config) => {
  on('file:preprocessor', cucumber())
  allureWriter(on, config);
  return config;
}
