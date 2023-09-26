import { homePage } from 'e2e/pages/home-page';
import TestFilter from '../../../support/test-filter';
import { producPage } from 'e2e/pages/product-page';
import { Condition, ProductItemsTitle } from 'e2e/model/modelTypes';
import { viewCartPage } from 'e2e/pages/view-cart-page';
import { productDetailsPage } from 'e2e/pages/product-details-page';

TestFilter(['product', 'regression'], () => {
  describe('Product Page', () => {
    it('Test Case 9: Search Product', () => {
      homePage.visit();
      homePage.verifyElementsAreVisible();
      homePage.navbar.verifyNavbarElementsAreVisible();
      homePage.navbar.elements.linkProduct().click();
      producPage.verifyAllProductsAreVisible();
      producPage.elements.searchInpput().type(ProductItemsTitle.Blue);
      producPage.elements.submitSearch().click();
      producPage.elements.searchedProductsTitle().should(Condition.ContainText, 'Searched Products');
      producPage.verifySearchProductsAreVisible(ProductItemsTitle.Blue);
    });
    it('Test Case 12: Add Products in Cart', () => {
      homePage.visit();
      homePage.verifyElementsAreVisible();
      homePage.navbar.elements.linkProduct().click();
      producPage.verifyAllProductsAreVisible();
      producPage.clickOnProductItem(1);
      producPage.elements.modalContinueShopping().click();
      producPage.clickOnProductItem(2);
      producPage.navbar.elements.linkCart().click();
      viewCartPage.verifyItemsAddedIntoCartIsOk(2);
    });
    it('Test Case 13: Verify Product quantity in Cart', () => {
      homePage.visit();
      homePage.verifyElementsAreVisible();
      homePage.navbar.verifyNavbarElementsAreVisible();
      homePage.clickOnProductItemDetails(1);
      cy.url().should(Condition.Contain, productDetailsPage.url);
      productDetailsPage.verifyElementsDetailsAreVisible();
      productDetailsPage.elements.quantity().clear().type('4');
      productDetailsPage.elements.addCart().click();
      productDetailsPage.elements.modalContinueShopping().click();
      productDetailsPage.navbar.elements.linkCart().click();
      viewCartPage.verifyQuantityOfItemIsOk(4);
    });
  });
});
