import { Languages } from "@models/language.model";

describe("Edit Language Page", () => {
  let mockLanguages: Languages;

  beforeEach(function () {
    cy.fixture("mockData.json").as("languages").then(() => {
      mockLanguages = this["languages"];
      cy.setInterceptors(mockLanguages);
      cy.visit("/edit/1");
    });
  });

  it("should start with six inputs & two bottom buttons", () => {
    cy.wait("@getLanguage");
    cy.get("form").children().should("have.length", 8);
  });

  it("should put language name into name input", () => {
    cy.wait("@getLanguage");
    cy.get("#name").invoke("val").should("eql", mockLanguages.languages[0].name);
  });

  it("should have label for Name", () => {
    cy.wait("@getLanguage");
    cy.get("#mat-mdc-form-field-label-0").then((label: JQuery<HTMLElement>) => {
      cy.wrap(label.get(0).innerText).should("eql", "Name");
    });
  });

  it("should add mat-error with text on clicking away from name input", () => {
    cy.wait("@getLanguage");
    cy.get("#name").clear();
    cy.get("#firstAppeared").click({ force: true });
    cy.get("mat-error").should("have.text", "Name is required");
  });

  it("should remove mat-error when name input is given a value", () => {
    cy.wait("@getLanguage");
    cy.get("#name").clear();
    cy.get("#firstAppeared").click({ force: true });
    cy.get("#name").type("Name", { force: true });
    cy.get("mat-error").should("not.exist");
  });

  it("should have creator input for each language creator", () => {
    cy.wait("@getLanguage");
    cy.get("[formarrayname='creators']").children().first().children("mat-form-field")
      .should("have.length", mockLanguages.languages[0].creators.length);
  });

  it("should put language creator(s) into creator input(s)", () => {
    cy.wait("@getLanguage");
    cy.get("[formarrayname='creators']").children().first().children("mat-form-field").each((_: JQuery<HTMLElement>, index: number) => {
      cy.get(`#creator-${index}`).invoke("val").should("eql", mockLanguages.languages[0].creators[index]);
    });
  });

  it("should have label for Creator", () => {
    cy.wait("@getLanguage");
    cy.get("#mat-mdc-form-field-label-4").then((label: JQuery<HTMLElement>) => {
      cy.wrap(label.get(0).innerText).should("eql", "Creator");
    });
  });

  it("should add mat-error with text on clicking away from emptied creator input", () => {
    cy.wait("@getLanguage");
    cy.get("#creator-0").clear();
    cy.get("#firstAppeared").click({ force: true });
    cy.get("mat-error").should("have.text", "Creator is required");
  });

  it("should remove mat-error when creators input is given a value", () => {
    cy.wait("@getLanguage");
    cy.get("#creator-0").clear();
    cy.get("#firstAppeared").click({ force: true });
    cy.get("#creator-0").type("Creator", { force: true });
    cy.get("mat-error").should("not.exist");
  });

  it("should add another 'Creators' input when '+ Add another creator' button is clicked", () => {
    cy.wait("@getLanguage");
    cy.get("[formarrayname='creators']").children().children().last().click();
    cy.get("[formarrayname='creators']").children().should("have.length", mockLanguages.languages[0].creators.length + 1);
  });

  it("should move '+ Add another creator' button after it is clicked", () => {
    cy.wait("@getLanguage");
    cy.get("[formarrayname='creators']").children().children().last().click();
    cy.get("[formarrayname='creators']").children().last().then((additionalCreatorButton: JQuery<HTMLElement>) => {
      cy.wrap(additionalCreatorButton.get(0).children.item(1)?.tagName).should("eql", "BUTTON");
    });
  });

  it("should remove additional 'Creators' input when 'x' is clicked", () => {
    cy.wait("@getLanguage");
    cy.get("[formarrayname='creators']").children().children().last().click();
    cy.get("mat-icon[aria-label$='Close icon']").first().click();
    cy.get("[formarrayname='creators']").children().should("have.length", mockLanguages.languages[0].creators.length);
  });

  it("should have extension input for each language extension", () => {
    cy.wait("@getLanguage");
    cy.get("[formarrayname='extensions']").children().should("have.length", mockLanguages.languages[0].extensions.length);
  });

  it("should put language extension(s) into extension input(s)", () => {
    cy.wait("@getLanguage");
    cy.get("[formarrayname='extensions']").children().each((_: JQuery<HTMLElement>, index: number) => {
      cy.get(`#extension-${index}`).invoke("val").should("eql", mockLanguages.languages[0].extensions[index]);
    });
  });

  it("should have label for Extension", () => {
    cy.wait("@getLanguage");
    cy.get("#mat-mdc-form-field-label-5").then((label: JQuery<HTMLElement>) => {
      cy.wrap(label.get(0).innerText).should("eql", "Extension");
    });
  });

  it("should add mat-error with text on clicking away from emptied extension input", () => {
    cy.wait("@getLanguage");
    cy.get("#extension-0").clear();
    cy.get("#firstAppeared").click({ force: true });
    cy.get("mat-error").should("have.text", "Extension is required");
  });

  it("should add mat-error with text on clicking away from invalid extension input", () => {
    cy.wait("@getLanguage");
    cy.get("#extension-0").clear();
    cy.get("#extension-0").type("Extension", { force: true });
    cy.get("#firstAppeared").click({ force: true });
    cy.get("mat-error").should("have.text", "Extension must start with a dot and contain no spaces or special characters");
  });

  it("should remove mat-error when extension input is given a valid value", () => {
    cy.wait("@getLanguage");
    cy.get("#extension-0").clear();
    cy.get("#firstAppeared").click({ force: true });
    cy.get("#extension-0").type(".ts", { force: true });
    cy.get("mat-error").should("not.exist");
  });

  it("should add another 'Extensions' input when '+ Add another extension' button is clicked", () => {
    cy.wait("@getLanguage");
    cy.get("[formarrayname='extensions']").children().children().last().click();
    cy.get("[formarrayname='extensions']").children().should("have.length", mockLanguages.languages[0].extensions.length + 1);
  });

  it("should move '+ Add another extension' button after it is clicked", () => {
    cy.wait("@getLanguage");
    cy.get("[formarrayname='extensions']").children().children().last().click();
    cy.get("[formarrayname='extensions']").children().last().then((additionalEXtensionButton: JQuery<HTMLElement>) => {
      cy.wrap(additionalEXtensionButton.get(0).children.item(1)?.tagName).should("eql", "BUTTON");
    });
  });

  it("should remove additional 'Extensions' input when 'x' is clicked", () => {
    cy.wait("@getLanguage");
    cy.get("[formarrayname='extensions']").children().children().last().click();
    cy.get("mat-icon[aria-label$='Close icon']").last().click();
    cy.get("[formarrayname='extensions']").children().should("have.length", mockLanguages.languages[0].extensions.length);
  });

  it("should put language firstAppeared into firstAppeared input if it is not null", () => {
    cy.wait("@getLanguage");
    cy.get("#firstAppeared").invoke("val").should("eql", mockLanguages.languages[0].firstAppeared ?? "");
  });

  it("should have label for First Appeared", () => {
    cy.wait("@getLanguage");
    cy.get("#mat-mdc-form-field-label-1").then((label: JQuery<HTMLElement>) => {
      cy.wrap(label.get(0).innerText).should("eql", "First Appeared");
    });
  });

  it("should add 'float-above' class to 'First Appeared' label on click", () => {
    cy.wait("@getLanguage");
    cy.get("form > :nth-child(4) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1)").then((firstAppearedLabel: JQuery<HTMLElement>) => {
      firstAppearedLabel.get(0).click();
      cy.wrap(firstAppearedLabel.get(0)).should("have.class", "mdc-floating-label--float-above");
    });
  });

  it("should open mat-datepicker-content when mat-datepicker-toggle is clicked", () => {
    cy.wait("@getLanguage");
    cy.get("mat-datepicker-toggle").click();
    cy.get("mat-datepicker-content").should("exist");
  });

  it("should apply mat-calendar-body-active class to current date", () => {
    cy.wait("@getLanguage");
    cy.get("mat-datepicker-toggle").click();
    cy.get(".mat-calendar-body-active").then((element: JQuery<HTMLElement>) => {
      const currentDateString: string = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      });
      cy.wrap(element.get(0).ariaLabel).should("eql", currentDateString);
    });
  });

  it("should apply date value to firstAppeared input when clicked", () => {
    cy.wait("@getLanguage");
    cy.get("mat-datepicker-toggle").click();
    cy.get(".mat-calendar-body-active").first().click();
    const currentDateString: string = new Date().toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric"
    });
    cy.get("#firstAppeared").invoke("val").should("eql", currentDateString);
  });

  it("should not set mat-error when firstAppeared input is clicked since firstAppeared is not a required field", () => {
    cy.wait("@getLanguage");
    cy.get("mat-datepicker-toggle").click();
    cy.get("#extension-0").click({ force: true });
    cy.get("mat-error").should("not.exist");
  });

  it("should apply min attribute of 1900-01-01 to firstAppeared input", () => {
    cy.wait("@getLanguage");
    cy.get("#firstAppeared").invoke("attr", "min").should("eql", "1900-01-01");
  });

  it("should apply max attribute of the current date to firstAppeared input", () => {
    const currentDate: Date = new Date();
    const dayString: string = currentDate.toUTCString().substring(5, 7);
    const monthString: string = (currentDate.getMonth() + 1).toString().padStart(2,"0");
    cy.wait("@getLanguage");
    cy.get("#firstAppeared").invoke("attr", "max").should("eql", `${currentDate.getFullYear()}-${monthString}-${dayString}`);
  });

  it("should not add mat-error with text on clicking away from cleared firstAppeared input", () => {
    cy.wait("@getLanguage");
    cy.get("#firstAppeared").clear({ force: true });
    cy.get("#name").click({ force: true });
    cy.get("mat-error").should("not.exist");
  });

  it("should put language name into name input", () => {
    cy.wait("@getLanguage");
    cy.get("#year").invoke("val").should("eql", mockLanguages.languages[0].year.toString());
  });

  it("should add 'float-above' class to 'Year' label on click", () => {
    cy.wait("@getLanguage");
    cy.get("form > :nth-child(5) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1)").then((yearLabel: JQuery<HTMLElement>) => {
      yearLabel.get(0).click();
      cy.wrap(yearLabel.get(0)).should("have.class", "mdc-floating-label--float-above");
    });
  });

  it("should add mat-error with text on clicking away from empty year input", () => {
    cy.wait("@getLanguage");
    cy.get("#year").clear();
    cy.get("#firstAppeared").click({ force: true });
    cy.get("mat-error").should("have.text", "Year is required");
  });

  it("should change mat-error when year input is given an invalid value", () => {
    cy.wait("@getLanguage");
    cy.get("#year").clear();
    cy.get("#year").type("1");
    cy.get("#firstAppeared").click({ force: true });
    cy.get("mat-error").should("have.text", "Year must be at least 1900");
  });

  it("should remove mat-error when year input is given a valid value", () => {
    cy.wait("@getLanguage");
    cy.get("#year").click();
    cy.get("#firstAppeared").click({ force: true });
    cy.get("#year").type("2000", { force: true });
    cy.get("mat-error").should("not.exist");
  });

  it("should apply min attribute of 1900 to year input", () => {
    cy.wait("@getLanguage");
    cy.get("#year").invoke("attr", "min").should("eql", "1900");
  });

  it("should apply max attribute of the current year to year input", () => {
    cy.wait("@getLanguage");
    cy.get("#year").invoke("attr", "max").should("eql", new Date().getFullYear().toString());
  });

  it("should put language name into name input", () => {
    cy.wait("@getLanguage");
    cy.get("#wiki").invoke("val").should("eql", mockLanguages.languages[0].wiki);
  });

  it("should add 'float-above' class to 'Wiki' label on click", () => {
    cy.wait("@getLanguage");
    cy.get("form > :nth-child(6) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(2) > :nth-child(1)").then((wikiLabel: JQuery<HTMLElement>) => {
      wikiLabel.get(0).click();
      cy.wrap(wikiLabel.get(0)).should("have.class", "mdc-floating-label--float-above");
    });
  });

  it("should add mat-error with text on clicking away from wiki input", () => {
    cy.wait("@getLanguage");
    cy.get("#wiki").click();
    cy.get("#wiki").clear();
    cy.get("#firstAppeared").click({ force: true });
    cy.get("mat-error").should("have.text", "Wiki is required");
  });

  it("should change mat-error when wiki input is given a invalid value", () => {
    cy.wait("@getLanguage");
    cy.get("#wiki").click();
    cy.get("#wiki").clear();
    cy.get("#wiki").type("wrong");
    cy.get("#firstAppeared").click({ force: true });
    cy.get("mat-error").should("have.text", "Wiki must be a url");
  });

  it("should remove mat-error when wiki input is given a valid value", () => {
    cy.wait("@getLanguage");
    cy.get("#wiki").click();
    cy.get("#wiki").clear();
    cy.get("#firstAppeared").click({ force: true });
    cy.get("#wiki").type("https://www.wikipedia.org", { force: true });
    cy.get("mat-error").should("not.exist");
  });

  it("should navigate to home page on clicking cancel button", () => {
    cy.wait("@getLanguage");
    cy.get("form").children().last().prev().click();
    cy.url().should("eql", "http://localhost:4200/");
  });

  it("should disable submit button when any required input has an invalid value", () => {
    cy.wait("@getLanguage");
    cy.get("#name").clear();
    cy.get("form").children().last().then((element: JQuery<HTMLElement>)=> {
      cy.wrap(element.get(0)).should("be.disabled");
    });
  });

  it("should re-enable submit button when all required inputs are given a valid value", () => {
    cy.wait("@getLanguage");
    cy.get("#name").clear();
    cy.get("#name").type("Name", { force: true });
    cy.get("form").children().last().then((element: JQuery<HTMLElement>)=> {
      cy.wrap(element.get(0)).should("be.enabled");
    });
  });

  it("should navigate to home page on clicking enabled submit button", () => {
    cy.wait("@getLanguage");
    cy.get("form").children().last().click();
    cy.url().should("eql", "http://localhost:4200/");
  });
});
