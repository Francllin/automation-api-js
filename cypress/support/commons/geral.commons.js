import hml from '../data/hml.json'
import prd from '../data/prd.json'

export function buscaMassa (chaves) {
  const env = Cypress.env('ENVIRONMENT')
  const massa = env === 'prd' ? prd : hml

  if (typeof chaves === 'string') {
    const arrChaves = chaves.split(' ')

    return arrChaves.reduce((acc, cur) => {
      const valid = acc[cur]

      if (valid) {
        acc = valid
      }

      return acc
    }, massa)
  }

  return 'parametros incorretos'
}
