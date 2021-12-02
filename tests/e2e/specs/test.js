// https://docs.cypress.io/api/introduction/api.html

describe("Registration", () => {
  it("User can register", () => {
    cy.visit("/");
    cy.contains("h4", "Create Your Account");
    // fields
    const fields = {
      email: `adninonofre@gmail.com`
    };
    screen
      .findByRole("textbox", {
        name: /email/i
      })
      .type("johndoe");
  });
});
