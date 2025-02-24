import './Request/onlineshop';
import './Intercept/onlineshop';
import './Intercept/checkoutpage';

Cypress.Commands.add('userlogin', (user, password) => {
    cy.request({
        method: 'POST',
        url: `${Cypress.env().base_url_api}/login`,
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

Cypress.Commands.add('connectDataBase', (query) => {
    cy.task('connectDB', query);
});