before('Intercepts de Pagina Checkout Page', () => {
    cy.intercept('POST', '/api/purchase').as('purchaseorder');
})