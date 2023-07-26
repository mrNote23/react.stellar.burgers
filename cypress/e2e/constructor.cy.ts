import "@4tw/cypress-drag-drop";
import order from "../fixtures/orderResponse.json";
import { email, password } from "../fixtures/loginRequest.json";

describe("Test Burger constructor", () => {
  beforeEach(() => {
    cy.visit("");
    cy.get("div[class^=burger-ingredients-item_item]").as("ingredients");
    cy.get("@ingredients").first().as("bun");
    cy.get("@ingredients").eq(5).as("ingredient");
    cy.get("section[class^=burger-constructor_section]").as("constructor");

    cy.intercept("POST", "api/auth/login", {
      fixture: "loginResponse.json",
    });

    cy.intercept("POST", "api/orders", {
      fixture: "orderResponse.json",
    });
  });

  it("should find ingredients", () => {
    cy.get("@ingredients").should("have.length.at.least", 5);
  });

  it("should open modal window, check title and close window", () => {
    cy.get("@ingredients").first().click();
    cy.get("div[class^=modal_header]").should(
      "have.text",
      "Детали ингредиента"
    );
    cy.get("p[class='text text_type_main-medium mt-4']").should(
      "have.text",
      "Краторная булка N-200i"
    );
    cy.get("button[class^=modal_closeBtn]").click();
    cy.get("div[class^=modal_header]").should("not.exist");
  });

  it("should ingredients dropped to order zone and create order", () => {
    cy.get("@constructor").contains("Перетащите булку");
    cy.get("@bun").drag("@constructor");
    cy.get("@ingredient").drag("@constructor");

    cy.get("div[class^=burger-constructor_item]").should("have.length", 3);

    cy.contains("Оформить заказ").click();

    cy.get("[name=email]").type(`${email}`);
    cy.get("[name=password]").type(`${password}`);
    cy.contains("Войти").click();

    cy.contains("Оформить заказ").click();

    cy.get("div[class^=modal_modal]").contains(order.order.number);
    cy.get("div[class^=modal_modal]").contains(order.name);
    cy.get("button[class^=modal_closeBtn]").click();
  });
});
