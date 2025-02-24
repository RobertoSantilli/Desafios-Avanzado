import './Request/onlineshop';
import './Intercept/onlineshop';
import './Intercept/checkoutpage';

Cypress.Commands.add('RegisterUser', (user,password,gender,birthday,birthmonth,birthyear) => {
    cy.request({
        method: 'POST',
        url: `${baseAPIUrl}/register`,
        body: {
            username : user,
            password: password,
            gender: gender,
            day: birthday,
            month: birthmonth,
            year: birthyear
        }
    })
})

Cypress.Commands.add('loginwithsession', (user,password,sessionname) => {
    cy.session(sessionname, () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env().base_url_api}/login`,
            body: {
                username : user,
                password: password
            },
        }).then((response) => {
            window.localStorage.setItem('token', response.body.token);
        window.localStorage.setItem('user', response.body.user.username);
        window.localStorage.setItem('userId', response.body.user._id);
        Cypress.env().token = window.localStorage.getItem('token');
        })
  },
    {
    cacheAcrossSpecs: true
    });
});

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
        window.localStorage.setItem('user', response.body.user.username);
        window.localStorage.setItem('userId', response.body.user._id);
        Cypress.env().token = window.localStorage.getItem('token');
    })
});

Cypress.Commands.add('connectDataBase', (query) => {
    cy.task('connectDB', query);
});