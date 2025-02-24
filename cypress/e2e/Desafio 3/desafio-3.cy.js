import { Homepage } from "../../support/pages/Homepage";
import { Productspage } from "../../support/pages/Productspage";
import { Shoppingcartpage } from "../../support/pages/Shoppingcartpage";
import { Billingsummarypage } from "../../support/pages/Billingsummarypage";
import { Checkoutpage } from "../../support/pages/Checkoutpage";
import { Reciptpage } from "../../support/pages/Reciptpage";

describe('Desafio 3 Avanzado', () => {

const homepage = new Homepage();
const productpage = new Productspage();
const shoppingcartpage = new Shoppingcartpage();
const billingsummarypage = new Billingsummarypage();
const checkoutpage = new Checkoutpage();
const reciptpage = new Reciptpage();

const constants = require('../../support/constants');

before('Cargar Testthis.data', () => {
    cy.userlogin(Cypress.env().user, Cypress.env().password);
    cy.fixture('products').as('data'); 
});

it('prueba', function () {

    cy.getproductid(this.data.product_1987.id).its('body.products.docs').each((product) => {
        this.data.product_1987._id = product._id;
        cy.deleteproductby_id(this.data.product_1987._id);
    });

    cy.createproduct(this.data.product_1987.name,this.data.product_1987.price,this.data.product_1987.imageurl,this.data.product_1987.id).its('body.product').then((product) => {
        expect(product.name).eq(this.data.product_1987.name);
        expect(product.price).eq(this.data.product_1987.price);
        expect(product.img).eq(this.data.product_1987.imageurl);
    });
    
    cy.getproductid(this.data.product_1988.id).its('body.products.docs').each((product) => {
        this.data.product_1988._id = product._id;
        cy.deleteproductby_id(this.data.product_1988._id);
    });

    cy.createproduct(this.data.product_1988.name,this.data.product_1988.price,this.data.product_1988.imageurl,this.data.product_1988.id).its('body.product').then((product) => {
        expect(product.name).eq(this.data.product_1988.name);
        expect(product.price).eq(this.data.product_1988.price);
        expect(product.img).eq(this.data.product_1988.imageurl);
    });

    cy.visit('');
    homepage.getonlineshoppagebutton().click();
    productpage.selecttypeofsearch('id');
    productpage.searchaproduct(`${this.data.product_1987.id}{enter}`);
    cy.wait('@getproductbyid').its('response.body.products.docs[0]').then(intercept => {
        expect(intercept.id).eq(this.data.product_1987.id);
        expect(intercept.name).eq(this.data.product_1987.name);
        expect(intercept.price).eq(this.data.product_1987.price);
    });
    productpage.addtocartproduct(this.data.product_1987.name);
    productpage.closemessagealert();
    productpage.addtocartproduct(this.data.product_1987.name);
    productpage.closemessagealert();

    productpage.searchaproduct(`{selectAll}{del}${this.data.product_1988.id}{enter}`);
    cy.wait('@getproductbyid').its('response.body.products.docs[0]').then(intercept => {
        expect(intercept.id).eq(this.data.product_1988.id);
        expect(intercept.name).eq(this.data.product_1988.name);
        expect(intercept.price).eq(this.data.product_1988.price);
    });
    productpage.addtocartproduct(this.data.product_1988.name);
    productpage.closemessagealert();
    productpage.addtocartproduct(this.data.product_1988.name);
    productpage.closemessagealert();

    productpage.clickongotoshoppingcart();

    shoppingcartpage.verifyproductname(this.data.product_1987.name).should('have.text', this.data.product_1987.name);
    shoppingcartpage.verifyquantityproduct(this.data.product_1987.name).should('have.text', constants.cantidad);
    shoppingcartpage.verifyunitpriceproduct(this.data.product_1987.name).should('have.text', `$${this.data.product_1987.price}`);
    shoppingcartpage.verifytotalpriceproduct(this.data.product_1987.name).should('have.text',`$${constants.cantidad*this.data.product_1987.price}`);
    shoppingcartpage.verifyproductname(this.data.product_1988.name).should('have.text', this.data.product_1988.name);
    shoppingcartpage.verifyquantityproduct(this.data.product_1988.name).should('have.text', constants.cantidad);
    shoppingcartpage.verifyunitpriceproduct(this.data.product_1988.name).should('have.text', `$${this.data.product_1988.price}`);
    shoppingcartpage.verifytotalpriceproduct(this.data.product_1988.name).should('have.text',`$${constants.cantidad*this.data.product_1988.price}`);

    shoppingcartpage.clickonshowtotalprice();
    shoppingcartpage.verifytotalprice().should('have.text', (constants.cantidad*(this.data.product_1987.price+this.data.product_1988.price)).toFixed(2));
    shoppingcartpage.clickongotobillingsummary();

    billingsummarypage.verifysubtotalbillingammount().should('have.text', `$${(constants.cantidad*(this.data.product_1987.price+this.data.product_1988.price))}`);
    billingsummarypage.verifytotalbillingammount().should('have.text', `$${(constants.cantidad*(this.data.product_1987.price+this.data.product_1988.price))}`);
    billingsummarypage.clickoncheckout();

    checkoutpage.typeuserfirstname(this.data.user.name);
    checkoutpage.typeuserlastname(this.data.user.lastname);
    checkoutpage.typeusercreditcard(this.data.user.creditcard);
    checkoutpage.clickonpurchasebutton();

    cy.wait('@purchaseorder').then(intercept => {
        let query;
        this.data.user.sellid = intercept.response.body.product.sellid;
        query = `SELECT * FROM "sells" RIGHT JOIN "purchaseProducts" ON sells.id = "purchaseProducts".sell_id where sell_id = ${this.data.user.sellid}`
        cy.connectDataBase(query).then(respuesta => {
            expect(respuesta[0].firstName).eq(this.data.user.name);
            expect(respuesta[0].lastName).eq(this.data.user.lastname);
            expect(respuesta[0].cardNumber).eq(`${this.data.user.creditcard}`);
            expect(respuesta[0].product).eq(this.data.product_1987.name);
            expect(respuesta[0].price).eq(this.data.product_1987.price.toFixed(2));
            expect(respuesta[0].quantity).eq(constants.cantidad);
            expect(respuesta[0].total_price).eq((constants.cantidad*this.data.product_1987.price).toFixed(2));
            expect(respuesta[0].sell_id).eq(this.data.user.sellid);

            expect(respuesta[1].firstName).eq(this.data.user.name);
            expect(respuesta[1].lastName).eq(this.data.user.lastname);
            expect(respuesta[1].cardNumber).eq(`${this.data.user.creditcard}`);
            expect(respuesta[1].product).eq(this.data.product_1988.name);
            expect(respuesta[1].price).eq(this.data.product_1988.price.toFixed(2));
            expect(respuesta[1].quantity).eq(constants.cantidad);
            expect(respuesta[1].total_price).eq((constants.cantidad*this.data.product_1988.price).toFixed(2));
            expect(respuesta[1].sell_id).eq(this.data.user.sellid);
            
            reciptpage.verifysellid().should('have.text', `${respuesta[0].sell_id}`)
            reciptpage.verifyusernameonrecipt().should('have.text', `${respuesta[0].firstName} ${respuesta[0].lastName} has succesfully purchased the following items:`);
            reciptpage.verifyproductsonrecipt(`${constants.cantidad} x ${this.data.product_1987.name}`).should('have.text', `${constants.cantidad} x ${respuesta[0].product}`)
            reciptpage.verifyproductsonrecipt(`${constants.cantidad} x ${this.data.product_1988.name}`).should('have.text', `${constants.cantidad} x ${respuesta[1].product}`)
            reciptpage.verifycreditcardonrecipt().should('have.text', `${respuesta[0].cardNumber}`);
            reciptpage.verifytotalammountrecipt().should('have.text', `Monney spent $${parseInt(respuesta[0].total_price)+parseInt(respuesta[1].total_price)}`);
            
        });
    });
});

});

