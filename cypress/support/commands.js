const baseAPIUrl= 'https://pushing-it-3.onrender.com/api';

Cypress.Commands.add('Userlogin', (user, password) => {
    cy.request({
        method: 'POST',
        url: `${baseAPIUrl}/login`,
        body: {
            username : user,
            password: password
        },
    }).then((response) => {
        window.localStorage.setItem('token', response.body.token);
        window.localStorage.setItem('username', response.body.user.username);
        window.localStorage.setItem('_id', response.body.user._id);
        Cypress.env().token = window.localStorage.getItem('token');

    })
});

Cypress.Commands.add('Getproductid', (id) => {
    return cy.request({
            method: 'GET',
            url: `${baseAPIUrl}/products?id=${id}`,
            headers: {
                Authorization: `Bearer ${Cypress.env().token}`,
            }
        });
});