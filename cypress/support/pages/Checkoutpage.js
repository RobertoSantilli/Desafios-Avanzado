export class Checkoutpage {

    constructor() {
        this.userfirstname = '[data-cy="firstName"]';
        this.userlastname = '[data-cy="lastName"]';
        this.usercreditcard = '[data-cy="cardNumber"]';
        this.purchasebutton = '[data-cy="purchase"]';
    }

    typeuserfirstname(userfirstname) {
        cy.get(this.userfirstname).type(userfirstname);
    };

    typeuserlastname(userlastname) {
        cy.get(this.userlastname).type(userlastname);
    };

    typeusercreditcard(usercreditcard) {
        cy.get(this.usercreditcard).type(usercreditcard);
    };

    clickonpurchasebutton() {
        cy.get(this.purchasebutton).click();
    };

    

}