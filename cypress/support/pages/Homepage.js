export class Homepage {

    constructor() {
        this.todolistlink = '#todolistlink';
        this.waitslink = '#waitslink';
        this.alertslink = '#alertslink';
        this.formutilslink = '#formutilslink';
        this.onlineshoplink = '#onlineshoplink';
        this.fileuploadlink = '#fileuploadlink';
    
        };
    
        gettodolistpagebutton() {
            return cy.get(this.todolistlink, {timeout: 5000});
        };
    
        getwaitspagebutton() {
            return cy.get(this.waitslink, {timeout: 5000});
        };
    
        getalertspagebutton() {
            return cy.get(this.alertslink, {timeout: 5000});
        };
    
        getformutilspagebutton() {
            return cy.get(this.formutilslink, {timeout: 5000});
        };
    
        getonlineshoppagebutton() {
            return cy.get(this.onlineshoplink, {timeout: 5000});
        };
    
        getfileuploadpagebutton() {
            return cy.get(this.fileuploadlink, {timeout: 5000});
        };
    
    };