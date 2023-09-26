import singleton from '../../helpers/singleton';

@singleton
class Navbar {
    elements = {
        navbarHeader: () => cy.get('.nav.navbar-nav'),
        linkProduct: () => cy.get(`a[href='/products']`),
        linkCart: () => cy.get(`li a[href='/view_cart']`),
        linkLogin: () => cy.get(`a[href='/login']`),
        linkTestCases: () => cy.get(`li a[href='/test_cases']`),
        linkApiList: () => cy.get(`a[href='/api_list']`),
        linkVideoTutorials: () => cy.get(`a[href='https://www.youtube.com/c/AutomationExercise']`),
        linkContactUs: () => cy.get(`a[href='/contact_us']`),
    }

    verifyNavbarElementsAreVisible() {
        cy.areElementsDisplayed([
            this.elements.navbarHeader, this.elements.linkProduct,
            this.elements.linkCart, this.elements.linkLogin, this.elements.linkTestCases, this.elements.linkVideoTutorials,
            this.elements.linkContactUs]);
    }
}
export const navbar = new Navbar();