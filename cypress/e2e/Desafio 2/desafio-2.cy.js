import { Homepage } from "../../support/pages/Homepage";
import { Productspage } from "../../support/pages/Productspage";

describe('Desafio 2 Avanzado', () => {

const homepage = new Homepage();
const productpage = new Productspage();

let data;

before('Cargar TestData', () => {
    cy.fixture('products').then(datos => {
        data=datos;
    }); 
});

it('Por medio de la API deberia buscar un producto por su ID, eliminarlo si existe, crear un nuevo producto y editarlo, Luego por Front-End verificar los datos del producto editado', () => {
    cy.userlogin(Cypress.env().user, Cypress.env().password);
    cy.getproductid(data.product_1000.id).its('body.products.docs').each((product) => {
        cy.deleteproductby_id(product._id)
    });
    cy.createproduct(data.product_1987.name,data.product_1987.price,data.product_1987.imageurl,data.product_1000.id).its('body.product').then((product) => {
        expect(product.name).eq(data.product_1987.name);
        expect(product.price).eq(data.product_1987.price);
        expect(product.img).eq(data.product_1987.imageurl);
        
        cy.editproductby_id(product._id, data.product_1000.imageurl, data.product_1000.name,data.product_1000.price);
    });

    cy.visit('');
    homepage.getonlineshoppagebutton().click();
    productpage.selecttypeofsearch('id');
    productpage.searchaproduct(`${data.product_1000.id}{enter}`);
    productpage.verifyproductname(data.product_1000.name).should('have.text',data.product_1000.name);
    productpage.verifyproductprice(data.product_1000.price).should('have.text',data.product_1000.price);
     
});

});
