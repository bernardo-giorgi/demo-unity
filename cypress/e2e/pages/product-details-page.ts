import { navbar } from './component/navbar';

class ProductDetailsPage {
    url = '/product_details';
    navbar = navbar;

    elements = {
        imageProduct: () => cy.get(`div[class='view-product'] img[alt='ecommerce website products']`),
        productInformation: () => cy.get(`.product-information`),
        categoryDetails: () => cy.get(`.category-tab.shop-details-tab`),
        categoryProducts: () => cy.get(`#accordian`),
        brandsProducts: () => cy.get(`.brands_products`),
        quantity: () => cy.get(`#quantity`),
        addCart: () => cy.get(`button[type='button']`),
        modalContinueShopping: () => cy.get('.btn.btn-success.close-modal.btn-block'),
    };

    verifyElementsDetailsAreVisible() {
        cy.areElementsDisplayed([this.elements.imageProduct, this.elements.productInformation, this.elements.categoryDetails,
        this.elements.categoryProducts, this.elements.brandsProducts])
    }
}

export const productDetailsPage = new ProductDetailsPage();