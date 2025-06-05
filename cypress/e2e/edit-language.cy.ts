describe("Edit Language Page", () => {
  beforeEach(function () {
    cy.fixture("mockData.json").as("languages").then(() => {
      cy.setInterceptors(this["languages"]).then(() => {
        cy.visit("/edit/1");
      });
    });
  });

  it("should start with six inputs & two bottom buttons", () => {
    cy.get("form").children().should("have.length", 8);
  });



  it("should navigate to home page on clicking cancel button", function () {
    cy.fixture("mockData.json").as("languages").then(() => {
      cy.setInterceptors(this["languages"]).then(() => {
        cy.get("form").children().last().prev().click();
        cy.url().should("eq", "http://localhost:4200/");
      });
    });
  });

  it("should disable submit button when any required input has an invalid value", () => {
    cy.get("#name").clear();
    cy.get("form").children().last().then((element: JQuery<HTMLElement>)=> {
      cy.wrap(element.get(0)).should("be.disabled", true);
    });
  });

  it("should re-enable submit button when all required inputs are given a valid value", () => {
    cy.get("#name").clear();
    cy.get("#name").type("Name", {force: true});
    cy.get("form").children().last().then((element: JQuery<HTMLElement>)=> {
      cy.wrap(element.get(0)).should("be.enabled", true);
    });
  });

  it("should navigate to home page on clicking enabled submit button", function () {
    cy.fixture("mockData.json").as("languages").then(() => {
      cy.setInterceptors(this["languages"]).then(() => {
        cy.get("form").children().last().click();
        cy.url().should("eq", "http://localhost:4200/");
      });
    });
  });
});
