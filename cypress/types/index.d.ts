declare namespace Cypress {
  interface Chainable {
    /**
     * Example of extending the type
     */
    example(value: string): Chainable<Element>
  }
}
