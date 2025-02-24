before('Intercepts de Pagina Online Shop', () => {
    cy.intercept('GET', '/api/products?**').as('getproducts');
    cy.intercept('POST', '/api/create-product').as('createproduct');
    cy.intercept('GET', '/api/products?id**').as('getproductbyid');
})