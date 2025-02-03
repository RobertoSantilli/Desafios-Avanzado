import { Homepage } from "../../support/pages/Homepage";
import { Productspage } from "../../support/pages/Productspage";

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
    cy.userlogin(Cypress.env().user, Cypress.env().password);
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
    productpage.verifyproductname(data.product.name).should('have.text',data.product.name);
    productpage.verifyproductprice(data.product.price).should('have.text',data.product.price);
    
    cy.getproductid(data.product.id).then((response) =>{
        expect(response.status).eq(200);
        expect(response.body.products.docs[0].name).to.be.equal(data.product.name);
        expect(response.body.products.docs[0].price).eq(data.product.price);
        expect(response.body.products.docs[0].id).eq(data.product.id);      
    });

    productpage.clickondeleteproduct(data.product.name);
    productpage.clickonconfirmdeleteproductbutton();
    productpage.closemessagealert();
    productpage.searchaproduct(`{enter}`);
    productpage.checkproductsfound().should('have.prop', 'childElementCount', 0);
    
    cy.getproductid(data.product.id).then((response) =>{
        expect(response.body.products.totalDocs).eq(0);
    });
    
});
});