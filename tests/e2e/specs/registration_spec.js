// https://docs.cypress.io/api/introduction/api.html
import { v4 as uuidv4 } from "uuid";
// test data
let randomString = uuidv4();
const splitString = randomString.split("-");
const payload = {
  email: `adninonofre${splitString[0]}@gmail.com`,
  full_name: `Name ${splitString[1]}`,
  password: `password${splitString[2]}`
};

describe("Registration", () => {
  it("User can register", () => {
    cy.visit("/");
    cy.contains("h4", "Create Your Account");
    // fields
    cy.get("#email").type(payload.email);
    cy.get("#full_name").type(payload.full_name);
    cy.get("#password").type(payload.password);
    cy.get("#password_confirmation").type(payload.password);
    // trigger submit button
    cy.get("#register_button").click({ force: true });
  });

  it("User can verify email address", () => {
    cy.contains("h1", "Enter your verification code");
    // test data
    const token = "00000";

    const splitToken = token.split("");
    // fields
    cy.get('[data-id="0"]').type(splitToken[0]);
    cy.get('[data-id="1"]').type(splitToken[1]);
    cy.get('[data-id="2"]').type(splitToken[2]);
    cy.get('[data-id="3"]').type(splitToken[3]);
    cy.get('[data-id="4"]').type(splitToken[4]);
  });

  it("User can login", () => {
    cy.contains("h4", "Log In to Your Account");
    // fields
    cy.get("#username").type(payload.email);
    cy.get("#password").type(payload.password);
    // trigger submit button
    cy.get("#login_button").click({ force: true });
  });

  it("Display a success page", () => {
    cy.get("#banner_message").should("be.visible");
  });
});
