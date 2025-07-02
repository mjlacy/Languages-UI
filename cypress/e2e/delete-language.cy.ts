describe("Delete Language Modal", () => {
  beforeEach(function () {
    cy.fixture("mockData.json").as("languages").then(() => {
      cy.setInterceptors(this["languages"]).then(() => {
        cy.visit("/");
        cy.get("[data-mat-icon-name='delete']").first().click();
      });
    });
  });

  it("should have title with language name", function () {
    cy.get("app-delete-language h2").contains(`Delete ${this["languages"].languages[0].name}?`);
  });

  it("should have subtitle", () => {
    cy.get("app-delete-language mat-dialog-content").then((subtitle: JQuery<HTMLElement>) => {
      cy.wrap(subtitle.get(0).innerHTML).should("eql", "This cannot be undone.");
    });
  });

  it("should have cancel button", () =>  {
    cy.get("app-delete-language mat-dialog-actions button").first().then((cancelButton: JQuery<HTMLElement>) => {
      cy.wrap(cancelButton.get(0).innerText).should("eql", "Cancel");
    });
  });

  it("should have delete button", () =>  {
    cy.get("app-delete-language mat-dialog-actions button").last().then((deleteButton: JQuery<HTMLElement>) => {
      cy.wrap(deleteButton.get(0).innerText).should("eql", "Delete");
    });
  });

  it("should close modal on clicking cancel button", () => {
    cy.get("app-delete-language mat-dialog-actions button").first().click();
    cy.get("mat-dialog-container").should("not.exist");
  });

  it("should close modal home page on clicking delete button", () => {
    cy.get("app-delete-language mat-dialog-actions button").last().click();
    cy.get("mat-dialog-container").should("not.exist");
  });
});
