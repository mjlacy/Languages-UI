import { Languages } from "@models/language.model";

describe("Language List Page", () => {
  let mockLanguages: Languages;

  beforeEach(function () {
    cy.fixture("mockData.json").as("languages").then(() => {
      mockLanguages = this["languages"];
      cy.setInterceptors(mockLanguages);
      cy.visit("/");
    });
  });

  it("should have headings", () => {
    const headings: string[] = ["Name", "Creators", "Extensions", "First Appeared", "Year", "Wiki", "Edit", "Delete"];

    cy.get("table thead tr").children().each((heading: JQuery<HTMLElement>, index: number) => {
      cy.wrap(heading.get(0).innerText).should("eql", headings[index]);
    });
  });

  it("should display 5 languages initially", () => {
    cy.wait("@getLanguages");
    cy.get("table tbody").children().then((children: JQuery<HTMLElement>) => {
      cy.wrap(children.length).should("eql", 5);
    });
  });

  it("should load first 5 languages", () => {
    cy.wait("@getLanguages");
    cy.get("table tbody").children().each((lang: JQuery<HTMLElement>, index: number) => {
      let firstAppeared: Date;
      let userTimezoneOffset: number;
      let firstAppearedString: string | null = null;

      if (!!mockLanguages.languages[index].firstAppeared) {
        firstAppeared = new Date(mockLanguages.languages[index].firstAppeared);
        userTimezoneOffset = firstAppeared.getTimezoneOffset() * 60000;
        firstAppearedString = new Date(firstAppeared.getTime() + userTimezoneOffset).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric"
        });
      }

      cy.wrap(lang.get(0).children.item(0)?.innerHTML.trim()).should("eql", mockLanguages.languages[index].name);
      cy.wrap(lang.get(0).children.item(1)?.innerHTML.trim()).should("eql", mockLanguages.languages[index].creators.toString().replace(/,/g,", "));
      cy.wrap(lang.get(0).children.item(2)?.innerHTML.trim()).should("eql", mockLanguages.languages[index].extensions.toString().replace(/,/g,", "));
      cy.wrap(lang.get(0).children.item(3)?.innerHTML.trim()).should("eql", firstAppearedString ?? "--");
      cy.wrap(lang.get(0).children.item(4)?.innerHTML.trim()).should("eql", mockLanguages.languages[index].year.toString());
      cy.wrap(lang.get(0).children.item(5)?.children.item(0)?.innerHTML.trim()).should("eql", mockLanguages.languages[index].wiki);
      cy.wrap(lang.get(0).children.item(6)?.children.item(0)?.innerHTML.trim()).should("contain", "data-mat-icon-name=\"edit\"");
      cy.wrap(lang.get(0).children.item(7)?.innerHTML.trim()).should("contain", "data-mat-icon-name=\"delete\"");
    });
  });

  it("should load next 5 languages on next button click", () => {
    cy.wait("@getLanguages");
    cy.get("div .mat-mdc-paginator-range-actions > :nth-child(4)").click();
    cy.get("table tbody").children().each((lang: JQuery<HTMLElement>, index: number) => {
      index += 5;
      let firstAppeared: Date;
      let userTimezoneOffset: number;
      let firstAppearedString: string | null = null;

      if (!!mockLanguages.languages[index].firstAppeared) {
        firstAppeared = new Date(mockLanguages.languages[index].firstAppeared as Date);
        userTimezoneOffset = firstAppeared.getTimezoneOffset() * 60000;
        firstAppearedString = new Date(firstAppeared.getTime() + userTimezoneOffset).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric"
        });
      }

      cy.wrap(lang.get(0).children.item(0)?.innerHTML.trim()).should("eql", mockLanguages.languages[index].name);
      cy.wrap(lang.get(0).children.item(1)?.innerHTML.trim()).should("eql", mockLanguages.languages[index].creators.toString().replace(/,/g,", "));
      cy.wrap(lang.get(0).children.item(2)?.innerHTML.trim()).should("eql", mockLanguages.languages[index].extensions.toString().replace(/,/g,", "));
      cy.wrap(lang.get(0).children.item(3)?.innerHTML.trim()).should("eql", firstAppearedString ?? "--");
      cy.wrap(lang.get(0).children.item(4)?.innerHTML.trim()).should("eql", mockLanguages.languages[index].year.toString());
      cy.wrap(lang.get(0).children.item(5)?.children.item(0)?.innerHTML.trim()).should("eql", mockLanguages.languages[index].wiki);
      cy.wrap(lang.get(0).children.item(6)?.children.item(0)?.innerHTML.trim()).should("contain", "data-mat-icon-name=\"edit\"");
      cy.wrap(lang.get(0).children.item(7)?.innerHTML.trim()).should("contain", "data-mat-icon-name=\"delete\"");
    });
  });

  it("should load last languages on last button click", () => {
    cy.wait("@getLanguages");
    cy.get("div .mat-mdc-paginator-range-actions > :nth-child(5)").click();
    cy.get("table tbody").children().each((lang: JQuery<HTMLElement>, index: number) => {
      index += 20;
      let firstAppeared: Date;
      let userTimezoneOffset: number;
      let firstAppearedString: string | null = null;

      if (!!mockLanguages.languages[index].firstAppeared) {
        firstAppeared = new Date(mockLanguages.languages[index].firstAppeared as Date);
        userTimezoneOffset = firstAppeared.getTimezoneOffset() * 60000;
        firstAppearedString = new Date(firstAppeared.getTime() + userTimezoneOffset).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric"
        });
      }

      cy.wrap(lang.get(0).children.item(0)?.innerHTML.trim()).should("eql", mockLanguages.languages[index].name);
      cy.wrap(lang.get(0).children.item(1)?.innerHTML.trim()).should("eql", mockLanguages.languages[index].creators.toString().replace(/,/g,", "));
      cy.wrap(lang.get(0).children.item(2)?.innerHTML.trim()).should("eql", mockLanguages.languages[index].extensions.toString().replace(/,/g,", "));
      cy.wrap(lang.get(0).children.item(3)?.innerHTML.trim()).should("eql", firstAppearedString ?? "--");
      cy.wrap(lang.get(0).children.item(4)?.innerHTML.trim()).should("eql", mockLanguages.languages[index].year.toString());
      cy.wrap(lang.get(0).children.item(5)?.children.item(0)?.innerHTML.trim()).should("eql", mockLanguages.languages[index].wiki);
      cy.wrap(lang.get(0).children.item(6)?.children.item(0)?.innerHTML.trim()).should("contain", "data-mat-icon-name=\"edit\"");
      cy.wrap(lang.get(0).children.item(7)?.innerHTML.trim()).should("contain", "data-mat-icon-name=\"delete\"");
    });
  });

  it("should load previous 5 languages on previous button click", () => {
    cy.wait("@getLanguages");
    cy.get("div .mat-mdc-paginator-range-actions > :nth-child(5)").click();
    cy.get("div .mat-mdc-paginator-range-actions > :nth-child(3)").click();
    cy.get("table tbody").children().each((lang: JQuery<HTMLElement>, index: number) => {
      index += 15;
      let firstAppeared: Date;
      let userTimezoneOffset: number;
      let firstAppearedString: string | null = null;

      if (!!mockLanguages.languages[index].firstAppeared) {
        firstAppeared = new Date(mockLanguages.languages[index].firstAppeared as Date);
        userTimezoneOffset = firstAppeared.getTimezoneOffset() * 60000;
        firstAppearedString = new Date(firstAppeared.getTime() + userTimezoneOffset).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric"
        });
      }

      cy.wrap(lang.get(0).children.item(0)?.innerHTML.trim()).should("eql", mockLanguages.languages[index].name);
      cy.wrap(lang.get(0).children.item(1)?.innerHTML.trim()).should("eql", mockLanguages.languages[index].creators.toString().replace(/,/g,", "));
      cy.wrap(lang.get(0).children.item(2)?.innerHTML.trim()).should("eql", mockLanguages.languages[index].extensions.toString().replace(/,/g,", "));
      cy.wrap(lang.get(0).children.item(3)?.innerHTML.trim()).should("eql", firstAppearedString ?? "--");
      cy.wrap(lang.get(0).children.item(4)?.innerHTML.trim()).should("eql", mockLanguages.languages[index].year.toString());
      cy.wrap(lang.get(0).children.item(5)?.children.item(0)?.innerHTML.trim()).should("eql", mockLanguages.languages[index].wiki);
      cy.wrap(lang.get(0).children.item(6)?.children.item(0)?.innerHTML.trim()).should("contain", "data-mat-icon-name=\"edit\"");
      cy.wrap(lang.get(0).children.item(7)?.innerHTML.trim()).should("contain", "data-mat-icon-name=\"delete\"");
    });
  });

  it("should load first 5 languages on first button click", () => {
    cy.wait("@getLanguages");
    cy.get("div .mat-mdc-paginator-range-actions > :nth-child(5)").click();
    cy.get("div .mat-mdc-paginator-range-actions > :nth-child(2)").click();
    cy.get("table tbody").children().each((lang: JQuery<HTMLElement>, index: number) => {
      let firstAppeared: Date;
      let userTimezoneOffset: number;
      let firstAppearedString: string | null = null;

      if (!!mockLanguages.languages[index].firstAppeared) {
        firstAppeared = new Date(mockLanguages.languages[index].firstAppeared);
        userTimezoneOffset = firstAppeared.getTimezoneOffset() * 60000;
        firstAppearedString = new Date(firstAppeared.getTime() + userTimezoneOffset).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric"
        });
      }

      cy.wrap(lang.get(0).children.item(0)?.innerHTML.trim()).should("eql", mockLanguages.languages[index].name);
      cy.wrap(lang.get(0).children.item(1)?.innerHTML.trim()).should("eql", mockLanguages.languages[index].creators.toString().replace(/,/g,", "));
      cy.wrap(lang.get(0).children.item(2)?.innerHTML.trim()).should("eql", mockLanguages.languages[index].extensions.toString().replace(/,/g,", "));
      cy.wrap(lang.get(0).children.item(3)?.innerHTML.trim()).should("eql", firstAppearedString ?? "--");
      cy.wrap(lang.get(0).children.item(4)?.innerHTML.trim()).should("eql", mockLanguages.languages[index].year.toString());
      cy.wrap(lang.get(0).children.item(5)?.children.item(0)?.innerHTML.trim()).should("eql", mockLanguages.languages[index].wiki);
      cy.wrap(lang.get(0).children.item(6)?.children.item(0)?.innerHTML.trim()).should("contain", "data-mat-icon-name=\"edit\"");
      cy.wrap(lang.get(0).children.item(7)?.innerHTML.trim()).should("contain", "data-mat-icon-name=\"delete\"");
    });
  });

  it("should display 10 languages on page size change", () => {
    cy.wait("@getLanguages");

    cy.get("div .mat-mdc-paginator-page-size-select").click();
    cy.get("div .mat-mdc-select-panel > :nth-child(2)").click();

    cy.get("table tbody").children().then((children: JQuery<HTMLElement>) => {
      cy.wrap(children.length).should("eql", 10);
    });
  });

  it("should display 20 languages on page size change", () => {
    cy.wait("@getLanguages");

    cy.get("div .mat-mdc-paginator-page-size-select").click();
    cy.get("div .mat-mdc-select-panel > :nth-child(3)").click();

    cy.get("table tbody").children().then((children: JQuery<HTMLElement>) => {
      cy.wrap(children.length).should("eql", 20);
    });
  });

  it("should display all languages on page size change", () => {
    cy.wait("@getLanguages");

    cy.get("div .mat-mdc-paginator-page-size-select").click();
    cy.get("div .mat-mdc-select-panel > :nth-child(4)").click();

    cy.get("table tbody").children().then((children: JQuery<HTMLElement>) => {
      cy.wrap(children.length).should("eql", mockLanguages.languages.length);
    });
  });

  it("should display 5 languages on page size change", () => {
    cy.wait("@getLanguages");

    cy.get("div .mat-mdc-paginator-page-size-select").click();
    cy.get("div .mat-mdc-select-panel > :nth-child(4)").click();
    cy.get("div .mat-mdc-paginator-page-size-select").click();
    cy.get("div .mat-mdc-select-panel > :nth-child(1)").click();

    cy.get("table tbody").children().then((children: JQuery<HTMLElement>) => {
      cy.wrap(children.length).should("eql", 5);
    });
  });

  it("should take the user to the wiki link clicked", () => {
    cy.wait("@getLanguages");

    cy.get("table tbody").children().first().then((firstChild: JQuery<HTMLElement>) => {
      const wikiLink: string = mockLanguages.languages[0].wiki;
      firstChild.get(0).children.item(5)?.children.item(0)?.click();
      cy.origin("https://en.wikipedia.org", { args: { wikiLink } }, ({ wikiLink }) => cy.url().should("eql", wikiLink));
    });
  });

  it("should take the user to the add page when 'Add Language' is clicked", () => {
    cy.wait("@getLanguages");
    cy.get("app-language-list > :nth-child(1) > :nth-child(1) > :nth-child(1)").click();
    cy.url().should("eql", "http://localhost:4200/add");
  });

  it("should take the user to the edit page when 'Edit' is clicked", () => {
    cy.wait("@getLanguages");
    cy.get("[data-mat-icon-name='edit']").first().click();
    cy.url().should("eql", "http://localhost:4200/edit/1");
  });

  it("should open the delete modal when 'Delete' is clicked", () => {
    cy.wait("@getLanguages");
    cy.get("[data-mat-icon-name='delete']").first().click();
    cy.get("mat-dialog-container").should("be.visible");
  });
});
