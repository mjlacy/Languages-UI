describe("Add Language Page", () => {
  beforeEach(() => {
    cy.visit("/add");
  });

  it("should start with six inputs & two bottom buttons", () => {
    cy.get("form").children().should("have.length", 8);
  });

  it("should have input labels", () => {
    const labels: string[] = ["Name", "Creator", "Extension", "First Appeared", "Year", "Wiki"];
    cy.get("form").children().each((child: JQuery<HTMLElement>, index: number) => {
      if (index > 5) {
        return;
      }

      let input: Element| null | undefined = child.get(0).children.item(0);
      if (input?.tagName.toUpperCase() !== "MAT-FORM-FIELD") {
        input = input?.children.item(0);
      }

      cy.wrap(input?.textContent).should("eq", labels[index]);
    });
  });

  it("should have a '+ Add another creator' button next to the last creator input", () => {
    cy.get("[formarrayname='creators']").children().first().then((element: JQuery<HTMLElement>) => {
      cy.wrap(element.children("button").get(0).innerText).should("eq", "+ Add another creator");
    });
  });

  it("should have enabled '+ Add another creator' button next to the last creator input", () => {
    cy.get("[formarrayname='creators']").children().first().then((element: JQuery<HTMLElement>) => {
      cy.wrap(element.children("button").get(0)).should("be.enabled", true);
    });
  });

  it("should have a '+ Add another extension' button next to the last extension input", () => {
    cy.get("[formarrayname='extensions']").children().first().then((element: JQuery<HTMLElement>) => {
      cy.wrap(element.children("button").get(0).innerText).should("eq", "+ Add another extension");
    });
  });

  it("should have enabled '+ Add another extension' button next to the last extension input", () => {
    cy.get("[formarrayname='extensions']").children().first().then((element: JQuery<HTMLElement>) => {
      cy.wrap(element.children("button").get(0)).should("be.enabled", true);
    });
  });

  it("should have cancel button label", () => {
    cy.get("form").children().last().prev().then((element: JQuery<HTMLElement>)=> {
      cy.wrap(element.get(0).innerText).should("eq", "Cancel");
    });
  });

  it("should have enabled cancel button", () => {
    cy.get("form").children().last().prev().then((element: JQuery<HTMLElement>)=> {
      cy.wrap(element.get(0)).should("be.enabled", true);
    });
  });

  it("should have submit button label", () => {
    cy.get("form").children().last().then((element: JQuery<HTMLElement>)=> {
      cy.wrap(element.get(0).innerText).should("eq", "Submit");
    });
  });

  it("should have disabled submit button", () => {
    cy.get("form").children().last().then((element: JQuery<HTMLElement>)=> {
      cy.wrap(element.get(0)).should("be.disabled", true);
    });
  });

  it("should add 'float-above' class to 'Name' label on click", () => {
    cy.get("form > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1)").then((nameLabel: JQuery<HTMLElement>) => {
      nameLabel.get(0).click();
      cy.wrap(nameLabel.get(0)).should("have.class", "mdc-floating-label--float-above");
    });
  });

  it("should add mat-error with text on clicking away from name input", () => {
    cy.get("#name").click();
    cy.get("form").click();
    cy.get("mat-error").should("have.text", "Name is required");
  });

  it("should remove mat-error when name input is given a value", () => {
    cy.get("#name").click();
    cy.get("form").click();
    cy.get("#name").type("Test", {force: true});
    cy.get("mat-error").should("not.exist", true);
  });
});
