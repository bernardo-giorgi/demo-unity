import { Condition } from 'e2e/model/modelTypes';
import { navbar } from './component/navbar';

class ViewCartPage {
    url = '/view_cart';
    navbar = navbar;

    elements = {
        cartInfoTable: () => cy.get('#cart_info_table'),
        cartPrice: (item: number) => cy.get(`tr[id='product-${item}'] td[class='cart_price'] p`),
        cartQuantity: (item: number) => cy.get(`tr[id='product-${item}'] td[class='cart_quantity'] button`),
        cartTotalPrice: (item: number) => cy.get(`tr[id='product-${item}'] td[class='cart_total'] p`),
    };

    verifyItemsAddedIntoCartIsOk(itemExpected: number) {
        cy.get('tbody').find('tr').should(Condition.HaveLength, itemExpected);
        this.elements.cartPrice(1).should(Condition.BeVisible);
        this.elements.cartQuantity(1).should(Condition.BeVisible);
        this.elements.cartTotalPrice(1).should(Condition.BeVisible);
        this.elements.cartPrice(2).should(Condition.BeVisible);
        this.elements.cartQuantity(2).should(Condition.BeVisible);
        this.elements.cartTotalPrice(2).should(Condition.BeVisible);
    }

    verifyQuantityOfItemIsOk(item: number) {
        this.elements.cartQuantity(1).should(Condition.ContainText, item);
    }

}

export const viewCartPage = new ViewCartPage();