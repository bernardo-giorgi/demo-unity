import { Condition } from '../e2e/model/modelTypes';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      isElementVisible(element: () => Cypress.Chainable<JQuery<HTMLElement>>): Cypress.Chainable;
      areElementsDisplayed(elements: Array<() => Cypress.Chainable<JQuery<HTMLElement>>>): Cypress.Chainable;
      redirectTitlePage(element: () => Cypress.Chainable<JQuery<HTMLElement>>, expected: string): Cypress.Chainable;
      verifyRedirectUrlPage(element: () => Cypress.Chainable<JQuery<HTMLElement>>, expected: string): Cypress.Chainable;
      isAttributeExpected(
        element: () => Cypress.Chainable<JQuery<HTMLElement>>,
        condition: string,
        attr: string,
        expectValue: string
      ): Cypress.Chainable;
      getAttributeOfElements(
        element: Array<() => Cypress.Chainable<JQuery<HTMLElement>>>,
        condition: string,
        attr: string,
        expectValue: string
      ): Cypress.Chainable;
      verifyRedirect(element: () => Cypress.Chainable<JQuery<HTMLElement>>, expected: string, num: number): Cypress.Chainable;
      popupWindow(element: () => Cypress.Chainable<JQuery<HTMLElement>>, popupUrl: string): Cypress.Chainable;
      invokeAttribute(element: () => Cypress.Chainable<JQuery<HTMLElement>>, expected: string): Cypress.Chainable;
      getIframe(element: () => Cypress.Chainable<JQuery<HTMLElement>>): Cypress.Chainable;
      login(username: string, password: string): void;
      checkIsLogged(): void;
    }
  }
}

export function isElementVisible(element: () => Cypress.Chainable<JQuery<HTMLElement>>): void {
  element().should(Condition.BeVisible);
}

export function areElementsDisplayed(elements: Array<() => Cypress.Chainable<JQuery<HTMLElement>>>): void {
  elements.forEach((element) => element().should(Condition.BeVisible));
}

export function redirectTitlePage(element: () => Cypress.Chainable<JQuery<HTMLElement>>, expected: string): void {
  element().click();
  cy.title().should(Condition.Contain, expected);
}

export function verifyRedirectUrlPage(element: () => Cypress.Chainable<JQuery<HTMLElement>>, expected: string): void {
  element().click({ force: true });
  cy.url().should(Condition.Contain, expected);
}

export function isAttributeExpected(
  element: () => Cypress.Chainable<JQuery<HTMLElement>>,
  condition: string,
  attr: string,
  expectValue: string
): void {
  element().should(condition, attr, expectValue);
}

export function getAttributeOfElements(
  elements: Array<() => Cypress.Chainable<JQuery<HTMLElement>>>,
  condition: string,
  attr: string,
  expectValue: string
): void {
  elements.forEach((element) => element().should(condition, attr, expectValue));
}

export function verifyRedirect(element: () => Cypress.Chainable<JQuery<HTMLElement>>, expected: string, num: number): void {
  element().eq(num).click();
  cy.url().should(Condition.Include, expected);
}

export function popupWindow(element: () => Cypress.Chainable<JQuery<HTMLElement>>, popupUrl: string): void {
  cy.window().then((win) => {
    cy.stub(win, 'open').as('winPopUpOpen');
  });
  element().click();
  cy.get('@winPopUpOpen').should('be.calledWith', popupUrl);
}

export function invokeAttribute(element: () => Cypress.Chainable<JQuery<HTMLElement>>, expected: string): void {
  element().invoke('removeAttr', 'target').click();
  cy.url().should(Condition.Include, expected);
}

export function login(username: string, password: string): void {
  const error = new Error('Define password, avoid windows domain block');
  if (!password) {
    throw error;
  }
  cy.visit('/');
  cy.get('button.layout-auth-nav-login').click();
  cy.get('input#username').type(username, { force: true });
  cy.get('input#password').type(password, { force: true });
  cy.get('button#kc-login').click({ force: true });
  cy.get('#button-my-balance', { timeout: 15000 }).should(Condition.BeVisible);
}

export function checkIsLogged(): void {
  if (Cypress.env('logged')) {
    login(Cypress.env('username'), Cypress.env('password'));
  }
}
export function getIframe(element: () => Cypress.Chainable<JQuery<HTMLElement>>): Cypress.Chainable {
  return element().its('0.contentDocument.body').should('not.be.empty').then(cy.wrap);
}

Cypress.Commands.add('isElementVisible', isElementVisible);

Cypress.Commands.add('areElementsDisplayed', areElementsDisplayed);

Cypress.Commands.add('redirectTitlePage', redirectTitlePage);

Cypress.Commands.add('verifyRedirectUrlPage', verifyRedirectUrlPage);

Cypress.Commands.add('isAttributeExpected', isAttributeExpected);

Cypress.Commands.add('getAttributeOfElements', getAttributeOfElements);

Cypress.Commands.add('verifyRedirect', verifyRedirect);

Cypress.Commands.add('popupWindow', popupWindow);

Cypress.Commands.add('invokeAttribute', invokeAttribute);

Cypress.Commands.add('getIframe', getIframe);

Cypress.Commands.add('login', login);

Cypress.Commands.add('checkIsLogged', checkIsLogged);

Cypress.on('uncaught:exception', () => false);
