import { Condition } from 'e2e/model/modelTypes';
import { navbar } from './component/navbar';

class ProductPage {
  url = '/products';
  navbar = navbar;

  elements = {
    featuresItems: () => cy.get('.features_items'),
    featureColItems: () => cy.get('div'),
    searchInpput: () => cy.get('#search_product'),
    submitSearch: () => cy.get('#submit_search'),
    searchedProductsTitle: () => cy.get('.title.text-center'),
    productInfoTextDescription: () => cy.get(`div[class='productinfo text-center'] p`),
    modalContinueShopping: () => cy.get('.btn.btn-success.close-modal.btn-block'),
  };

  visit = () => cy.visit(this.url);

  verifyFeatureItemsAreDisplayed() {
    cy.areElementsDisplayed([this.elements.featuresItems]);
  }

  verifyAllProductsAreVisible() {
    this.elements.featureColItems().find('[class="col-sm-4"]').should(Condition.HaveLength, 35);
  }

  verifySearchProductsAreVisible(expectedProduct: string) {
    this.elements.featureColItems().find('[class="col-sm-4"]').should(Condition.ContainText, expectedProduct);
  }

  clickOnProductItem(item: number) {
    cy.get(`div [data-product-id=${item}]`).first().click()
  }

  clickOnProductItemDetails(item: number) {
    cy.get(`a[href='/product_details/${item}']`).first().click()
  }



}

export const producPage = new ProductPage();