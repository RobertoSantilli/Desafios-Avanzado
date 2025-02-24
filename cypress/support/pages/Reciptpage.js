export class Reciptpage {

    constructor() {
        this.sellid = '[data-cy="sellId"]';
        this.usernameonrecipt = '[data-cy="name"]';
        this.creditcardonrecipt = '[data-cy="creditCard"]';
        this.totalammountrecipt = '[data-cy="totalPrice"]';
    };

    verifysellid() {
        return cy.get(this.sellid);
    }

    verifyusernameonrecipt() {
        return cy.get(this.usernameonrecipt);
    };

    verifycreditcardonrecipt() {
        return cy.get(this.creditcardonrecipt);
    };

    verifyproductsonrecipt(quantity, product){
        return cy.get('p').contains(quantity, product);
    };

    verifytotalammountrecipt() {
        return cy.get(this.totalammountrecipt);
    };


}