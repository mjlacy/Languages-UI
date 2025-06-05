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
    cy.get("#firstAppeared").click({ force: true });
    cy.get("mat-error").should("have.text", "Name is required");
  });

  it("should remove mat-error when name input is given a value", () => {
    cy.get("#name").click();
    cy.get("#firstAppeared").click({ force: true });
    cy.get("#name").type("Name", {force: true});
    cy.get("mat-error").should("not.exist", true);
  });

  it("should add 'float-above' class to 'Creator' label on click", () => {
    cy.get("form > :nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1)").then((creatorLabel: JQuery<HTMLElement>) => {
      creatorLabel.get(0).click();
      cy.wrap(creatorLabel.get(0)).should("have.class", "mdc-floating-label--float-above");
    });
  });

  it("should add mat-error with text on clicking away from empty creator input", () => {
    cy.get("#creator-0").click();
    cy.get("#firstAppeared").click({ force: true });
    cy.get("mat-error").should("have.text", "Creator is required");
  });

  it("should remove mat-error when creator input is given a value", () => {
    cy.get("#creator-0").click();
    cy.get("#firstAppeared").click({ force: true });
    cy.get("#creator-0").type("Creator", {force: true});
    cy.get("mat-error").should("not.exist", true);
  });

  it("should add another 'Creators' input when '+ Add another creator' button is clicked", () => {
    cy.get("[formarrayname='creators']").children().children().last().click();
    cy.get("[formarrayname='creators']").children().should("have.length", 2);
  });

  it("should move '+ Add another creator' button after it is clicked", () => {
    cy.get("[formarrayname='creators']").children().children().last().click();
    cy.get("[formarrayname='creators']").children().last().then((additionalCreatorButton: JQuery<HTMLElement>) => {
      cy.wrap(additionalCreatorButton.get(0).children.item(1)?.tagName).should("eq", "BUTTON");
    });
  });

  it("should remove additional 'Creators' input when 'x' is clicked", () => {
    cy.get("[formarrayname='creators']").children().children().last().click();
    cy.get("mat-icon[aria-label$='Close icon']").click();
    cy.get("[formarrayname='creators']").children().should("have.length", 1);
  });

  it("should add 'float-above' class to 'Extension' label on click", () => {
    cy.get("form > :nth-child(3) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1)").then((extensionLabel: JQuery<HTMLElement>) => {
      extensionLabel.get(0).click();
      cy.wrap(extensionLabel.get(0)).should("have.class", "mdc-floating-label--float-above");
    });
  });

  it("should add mat-error with text on clicking away from empty extension input", () => {
    cy.get("#extension-0").click();
    cy.get("#firstAppeared").click({ force: true });
    cy.get("mat-error").should("have.text", "Extension is required");
  });

  it("should change mat-error when extension input is given a invalid value", () => {
    cy.get("#extension-0").click();
    cy.get("#extension-0").type("extension");
    cy.get("#firstAppeared").click({ force: true });
    cy.get("mat-error").should("have.text", "Extension must start with a dot and contain no spaces or special characters");
  });

  it("should remove mat-error when extension input is given a valid value", () => {
    cy.get("#extension-0").click();
    cy.get("#firstAppeared").click({ force: true });
    cy.get("#extension-0").type(".ts", {force: true});
    cy.get("mat-error").should("not.exist", true);
  });

  it("should add another 'Extensions' input when '+ Add another extension' button is clicked", () => {
    cy.get("[formarrayname='extensions']").children().children().last().click();
    cy.get("[formarrayname='extensions']").children().should("have.length", 2);
  });

  it("should move '+ Add another extension' button after it is clicked", () => {
    cy.get("[formarrayname='extensions']").children().children().last().click();
    cy.get("[formarrayname='extensions']").children().last().then((additionalEXtensionButton: JQuery<HTMLElement>) => {
      cy.wrap(additionalEXtensionButton.get(0).children.item(1)?.tagName).should("eq", "BUTTON");
    });
  });

  it("should remove additional 'Extensions' input when 'x' is clicked", () => {
    cy.get("[formarrayname='extensions']").children().children().last().click();
    cy.get("mat-icon[aria-label$='Close icon']").click();
    cy.get("[formarrayname='extensions']").children().should("have.length", 1);
  });

  it("should add 'float-above' class to 'First Appeared' label on click", () => {
    cy.get("form > :nth-child(4) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1)").then((firstAppearedLabel: JQuery<HTMLElement>) => {
      firstAppearedLabel.get(0).click();
      cy.wrap(firstAppearedLabel.get(0)).should("have.class", "mdc-floating-label--float-above");
    });
  });

  it("should open mat-datepicker-content when mat-datepicker-toggle is clicked", () => {
    cy.get("mat-datepicker-toggle").click();
    cy.get("mat-datepicker-content").should("exist", true);
  });

  it("should apply mat-calendar-body-active class to current date", () => {
    cy.get("mat-datepicker-toggle").click();
    cy.get(".mat-calendar-body-active").then((element: JQuery<HTMLElement>) => {
       const currentDateString: string = new Date().toLocaleDateString("en-US", {
         month: "long",
         day: "numeric",
         year: "numeric"
       });
      cy.wrap(element.get(0).ariaLabel).should("eq", currentDateString);
    });
  });

  it("should apply date value to firstAppeared input when clicked", () => {
    cy.get("mat-datepicker-toggle").click();
    cy.get(".mat-calendar-body-active").first().click();
    const currentDateString: string = new Date().toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric"
    });
    cy.get("#firstAppeared").invoke("val").should("eq", currentDateString);
  });

  it("should not set mat-error when firstAppeared input is clicked since firstAppeared is not a required field", () => {
    cy.get("mat-datepicker-toggle").click();
    cy.get("#extension-0").click();
    cy.get("mat-error").should("not.exist", true);
  });

  it("should apply min attribute of 1900-01-01 to firstAppeared input", () => {
    cy.get("#firstAppeared").invoke("attr", "min").should("eq", "1900-01-01");
  });

  it("should apply max attribute of the current date to firstAppeared input", () => {
    const currentDate: Date = new Date();
    const dayString: string = currentDate.toUTCString().substring(5, 7);
    const monthString: string = (currentDate.getMonth() + 1).toString().padStart(2,"0");

    cy.get("#firstAppeared").invoke("attr", "max").should("eq", `${currentDate.getFullYear()}-${monthString}-${dayString}`);
  });

  it("should add 'float-above' class to 'Year' label on click", () => {
    cy.get("form > :nth-child(5) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1)").then((yearLabel: JQuery<HTMLElement>) => {
      yearLabel.get(0).click();
      cy.wrap(yearLabel.get(0)).should("have.class", "mdc-floating-label--float-above");
    });
  });

  it("should add mat-error with text on clicking away from empty year input", () => {
    cy.get("#year").click();
    cy.get("#firstAppeared").click({ force: true });
    cy.get("mat-error").should("have.text", "Year is required");
  });

  it("should change mat-error when year input is given a invalid value", () => {
    cy.get("#year").click();
    cy.get("#year").type("1");
    cy.get("#firstAppeared").click({ force: true });
    cy.get("mat-error").should("have.text", "Year must be at least 1900");
  });

  it("should remove mat-error when year input is given a valid value", () => {
    cy.get("#year").click();
    cy.get("#firstAppeared").click({ force: true });
    cy.get("#year").type("2000", {force: true});
    cy.get("mat-error").should("not.exist", true);
  });

  it("should apply min attribute of 1900 to year input", () => {
    cy.get("#year").invoke("attr", "min").should("eq", "1900");
  });

  it("should apply max attribute of the current year to year input", () => {
    cy.get("#year").invoke("attr", "max").should("eq", new Date().getFullYear().toString());
  });

  it("should add 'float-above' class to 'Wiki' label on click", () => {
    cy.get("form > :nth-child(6) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1)").then((wikiLabel: JQuery<HTMLElement>) => {
      wikiLabel.get(0).click();
      cy.wrap(wikiLabel.get(0)).should("have.class", "mdc-floating-label--float-above");
    });
  });

  it("should add mat-error with text on clicking away from wiki input", () => {
    cy.get("#wiki").click();
    cy.get("#firstAppeared").click({ force: true });
    cy.get("mat-error").should("have.text", "Wiki is required");
  });

  it("should change mat-error when wiki input is given a invalid value", () => {
    cy.get("#wiki").click();
    cy.get("#wiki").type("wrong");
    cy.get("#firstAppeared").click({ force: true });
    cy.get("mat-error").should("have.text", "Wiki must be a url");
  });

  it("should remove mat-error when wiki input is given a valid value", () => {
    cy.get("#wiki").click();
    cy.get("#firstAppeared").click({ force: true });
    cy.get("#wiki").type("https://www.wikipedia.org", {force: true});
    cy.get("mat-error").should("not.exist", true);
  });

  it("should navigate to home page on clicking cancel button", function () {
    cy.fixture("mockData.json").as("languages").then(() => {
      cy.setInterceptors(this["languages"]).then(() => {
        cy.get("form").children().last().prev().click();
        cy.url().should("eq", "http://localhost:4200/");
      });
    });
  });

  it("should enable submit button when all required inputs are given a valid value", () => {
    cy.get("#name").type("Name", {force: true});
    cy.get("#creator-0").type("Creator", {force: true});
    cy.get("#extension-0").type(".ts", {force: true});
    cy.get("#year").type("2000", {force: true});
    cy.get("#wiki").type("https://www.wikipedia.org", {force: true});
    cy.get("form").children().last().then((element: JQuery<HTMLElement>)=> {
      cy.wrap(element.get(0)).should("be.enabled", true);
    });
  });

  it("should navigate to home page on clicking enabled submit button", function () {
    cy.fixture("mockData.json").as("languages").then(() => {
      cy.setInterceptors(this["languages"]).then(() => {
        cy.get("#name").type("Name", {force: true});
        cy.get("#creator-0").type("Creator", {force: true});
        cy.get("#extension-0").type(".ts", {force: true});
        cy.get("#year").type("2000", {force: true});
        cy.get("#wiki").type("https://www.wikipedia.org", {force: true});
        cy.get("form").children().last().click();
        cy.url().should("eq", "http://localhost:4200/");
      });
    });
  });
});
