Cypress.Commands.add('getproductid', (id) => {
    return cy.request({
            method: 'GET',
            url: `${Cypress.env().base_url_api}/products?id=${id}`,
            headers: {
                Authorization: `Bearer ${Cypress.env().token}`,
            }
        }).then(response => {
            expect(response.status).eq(200);
        });
    });

Cypress.Commands.add('deleteproductby_id', (_id) => {
    return cy.request({
            method: 'DELETE',
            url: `${Cypress.env().base_url_api}/product/${_id}`,
            headers: {
                Authorization: `Bearer ${Cypress.env().token}`,
            }
        }).then(response => {
            expect(response.status).eq(202);
    });;
});

Cypress.Commands.add('createproduct', (name, price, img, id) => {
    return cy.request({
            method: 'POST',
            url: `${Cypress.env().base_url_api}/create-product`,
            body: {
                "name": name,
                "price": price,
                "img": img,
                "id": id
            },
            headers: {
                Authorization: `Bearer ${Cypress.env().token}`,
            }
        }).then(response => {
            expect(response.status).eq(201);
    });
});

Cypress.Commands.add('editproductby_id', (_id, img, name, price) => {
    return cy.request({
            method: 'PUT',
            url: `${Cypress.env().base_url_api}/product/${_id}`,
            body: {
                "img": img,
                "name": name,
                "price": price,
            },
            headers: {
                Authorization: `Bearer ${Cypress.env().token}`,
            }
        }).then(response => {
            expect(response.status).eq(202);
    });
});