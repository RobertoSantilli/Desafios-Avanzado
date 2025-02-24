export class Billingsummarypage {

    constructor() {
        this.subtotalbillingammount = '[data-cy="subtotalAmount"]';
        this.totalbillingammount = '[data-cy="totalPriceAmount"]';
        this.gotocheckoutbutton = '[data-cy="goCheckout"]';
    };

    verifysubtotalbillingammount() {
        return cy.get(this.subtotalbillingammount);
    };

    verifytotalbillingammount() {
        return cy.get(this.totalbillingammount);
    };

    clickoncheckout() {
        cy.get(this.gotocheckoutbutton).click();
    };

}