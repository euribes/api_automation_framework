/* eslint-disable camelcase */

describe('Products API', () => {
  it('Get all products', () => {
    cy.request({
      method: 'GET',
      url: '/wp-json/wc/v3/products',
      auth: {
        username: Cypress.env('USERNAME'),
        password: Cypress.env('PASSWORD')
      }
    }).then((response) => {
      expect(response.status).eq(200)
      expect(response.body.length).eq(10)
    })
  })

  it('Create a new Product', () => {
    cy.request({
      method: 'POST',
      url: '/wp-json/wc/v3/products/',
      auth: {
        username: Cypress.env('USERNAME'),
        password: Cypress.env('PASSWORD')
      },
      body: {
        name: 'APIProductName',
        type: 'simple',
        regular_price: '88',
        description: 'This is an API description',
        short_description: 'This is an API short description'
      }
    }).then((response) => {
      expect(response.status).eq(201)
      Cypress.env('PRODUCTID', response.body.id)
    })
  })

  it('Delete a product', () => {
    cy.request({
      method: 'DELETE',
      url: '/wp-json/wc/v3/products/' + Cypress.env('PRODUCTID'),
      auth: {
        username: Cypress.env('USERNAME'),
        password: Cypress.env('PASSWORD')
      }
    }).then((response) => {
      expect(response.status === 200)
    })
  })
})
