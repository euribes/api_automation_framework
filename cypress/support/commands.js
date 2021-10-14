import { woocommerceAPI } from '../../cypress.json'

Cypress.Commands.add('createNewProductFromJSONFile', () => {
  cy.fixture('product.json').then((product) => {
    return cy
      .request({
        method: 'POST',
        url: woocommerceAPI,
        auth: {
          username: Cypress.env('USERNAME'),
          password: Cypress.env('PASSWORD')
        },
        body: product.description
      })
      .then((response) => {
        expect(response.status).eq(200)
        return response.body
      })
  })
})

Cypress.Commands.add('deleteProduct', (product) => {
  return cy
    .request({
      method: 'DELETE',
      url: `${woocommerceAPI}/${product}`,
      auth: {
        username: Cypress.env('USERNAME'),
        password: Cypress.env('PASSWORD')
      }
    })
    .then((response) => {
      expect(response.status === 200)
    })
})
