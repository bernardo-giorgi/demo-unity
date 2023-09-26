import { navbar } from './component/navbar';

class HomePage {
  url = '/';
  navbar = navbar;

  elements = {
    logoAutomationExercise: () => cy.get(`img[alt='Website for automation practice']`),
    slider: () => cy.get('#slider'),
    sliderCarousel: () => cy.get('#slider-carousel'),
    footer: () => cy.get('#footer'),
  };

  visit = () => cy.visit(this.url);

  verifyElementsAreVisible() {
    cy.areElementsDisplayed([this.elements.logoAutomationExercise, this.elements.slider, this.elements.sliderCarousel, this.elements.footer]);
  }

  clickOnProductItemDetails(item: number) {
    cy.get(`a[href='/product_details/${item}']`).first().click()
  }
}

export const homePage = new HomePage();
