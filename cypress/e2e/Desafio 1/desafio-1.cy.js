import { Homepage } from "C:/curso-cypress/Desafios-avanzado/cypress/support/pages/Homepage"
import { Productspage } from "C:/curso-cypress/Desafios-avanzado/cypress/support/pages/Productspage"

describe('Desafio 1 Avanzado', () => {

const homepage = new Homepage();
const productpage = new Productspage();

let data;

before('Cargar TestData', () => {
    cy.fixture('product-1987').then(datos => {
        data=datos;
    });
});

beforeEach('Inicio de sesion en PushingIT', () =>{
    cy.Userlogin(Cypress.env().user, Cypress.env().password);
    cy.visit('');
});

it('Deberia Agregar un producto nuevo en Online Shop, buscarlo por su ID, eliminar el producto y verificar que ya no exista', () => {
    homepage.getonlineshoppagebutton().click();

    productpage.clickonaddnewproduct();
    productpage.typenewproductname(data.product.name);
    productpage.typenewproductprice(data.product.price);
    productpage.typenewproductimage(data.product.imageurl);
    productpage.typenewproductid(data.product.id);
    productpage.clickoncreatenewproduct();
    productpage.closemessagealert();
    productpage.selecttypeofsearch('id');
    productpage.searchaproduct(`${data.product.id}{enter}`);
    productpage.verifyproductname(data.product.name).should('have.text',"Chaqueta Negra");
    productpage.verifyproductprice(data.product.price).should('have.text','150');
    
    cy.Getproductid(data.product.id).then((response) =>{
        expect(response.status).eq(200);
        expect(response.body.products.docs[0].name).to.be.equal("Chaqueta Negra");
        expect(response.body.products.docs[0].price).eq(150);
        expect(response.body.products.docs[0].id).eq(1987);      
    });

    productpage.clickondeleteproduct(data.product.name);
    productpage.clickonconfirmdeleteproductbutton();
    productpage.closemessagealert();
    productpage.searchaproduct(`{enter}`);
    productpage.checkproductsfound().should('have.prop', 'childElementCount', 0);
    
    cy.Getproductid(data.product.id).then((response) =>{
        expect(response.body.products.totalDocs).eq(0);
    });
    
});
});