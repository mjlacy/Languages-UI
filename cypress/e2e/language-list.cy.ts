describe("Language List Page", () => {
  beforeEach(function () {
    cy.fixture("mockData.json").as("languages").then(() => {
      cy.setInterceptors(this["languages"]).then(() => {
        cy.visit("/");
      });
    });
  });

  it("should have headings", () => {
    cy.wait("@getLanguages");
    const headings: string[] = ["Name", "Creators", "Extensions", "First Appeared", "Year", "Wiki", "Edit", "Delete"];

    cy.get("table thead tr").children().each((heading: JQuery<HTMLElement>, index: number) => {
      cy.wrap(heading.get(0).innerText).should("eq", headings[index]);
    });
  });

  it("should display 5 languages initially", () => {
    cy.wait("@getLanguages");
    cy.get("table tbody").children().then((children: JQuery<HTMLElement>) => {
      cy.wrap(children.length).should("eq", 5);
    });
  });

  it("should load first 5 languages", function () {
    cy.wait("@getLanguages");
    cy.get("table tbody").children().each((lang: JQuery<HTMLElement>, index: number) => {
      let firstAppeared: Date;
      let userTimezoneOffset: number;
      let firstAppearedString: string | null = null;

      if (!!this["languages"].languages[index].firstAppeared) {
        firstAppeared = new Date(this["languages"].languages[index].firstAppeared);
        userTimezoneOffset = firstAppeared.getTimezoneOffset() * 60000;
        firstAppearedString = new Date(firstAppeared.getTime() + userTimezoneOffset).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric"
        });
      }

      cy.wrap(lang.get(0).children.item(0)?.innerHTML.trim()).should("eq", this["languages"].languages[index].name);
      cy.wrap(lang.get(0).children.item(1)?.innerHTML.trim()).should("eq", this["languages"].languages[index].creators.toString().replace(/,/g,", "));
      cy.wrap(lang.get(0).children.item(2)?.innerHTML.trim()).should("eq", this["languages"].languages[index].extensions.toString().replace(/,/g,", "));
      cy.wrap(lang.get(0).children.item(3)?.innerHTML.trim()).should("eq", firstAppearedString ?? "--");
      cy.wrap(lang.get(0).children.item(4)?.innerHTML.trim()).should("eq", this["languages"].languages[index].year.toString());
      cy.wrap(lang.get(0).children.item(5)?.children.item(0)?.innerHTML.trim()).should("eq", this["languages"].languages[index].wiki);
      cy.wrap(lang.get(0).children.item(6)?.children.item(0)?.innerHTML.trim()).should("contain", "data-mat-icon-name=\"edit\"");
      cy.wrap(lang.get(0).children.item(7)?.innerHTML.trim()).should("contain", "data-mat-icon-name=\"delete\"");
    });
  });

  it("should load next 5 languages on next button click", function () {
    cy.wait("@getLanguages");
    cy.get("div .mat-mdc-paginator-range-actions > :nth-child(4)").click();
    cy.get("table tbody").children().each((lang: JQuery<HTMLElement>, index: number) => {
      index += 5;
      let firstAppeared: Date;
      let userTimezoneOffset: number;
      let firstAppearedString: string | null = null;

      if (!!this["languages"].languages[index].firstAppeared) {
        firstAppeared = new Date(this["languages"].languages[index].firstAppeared);
        userTimezoneOffset = firstAppeared.getTimezoneOffset() * 60000;
        firstAppearedString = new Date(firstAppeared.getTime() + userTimezoneOffset).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric"
        });
      }

      cy.wrap(lang.get(0).children.item(0)?.innerHTML.trim()).should("eq", this["languages"].languages[index].name);
      cy.wrap(lang.get(0).children.item(1)?.innerHTML.trim()).should("eq", this["languages"].languages[index].creators.toString().replace(/,/g,", "));
      cy.wrap(lang.get(0).children.item(2)?.innerHTML.trim()).should("eq", this["languages"].languages[index].extensions.toString().replace(/,/g,", "));
      cy.wrap(lang.get(0).children.item(3)?.innerHTML.trim()).should("eq", firstAppearedString ?? "--");
      cy.wrap(lang.get(0).children.item(4)?.innerHTML.trim()).should("eq", this["languages"].languages[index].year.toString());
      cy.wrap(lang.get(0).children.item(5)?.children.item(0)?.innerHTML.trim()).should("eq", this["languages"].languages[index].wiki);
      cy.wrap(lang.get(0).children.item(6)?.children.item(0)?.innerHTML.trim()).should("contain", "data-mat-icon-name=\"edit\"");
      cy.wrap(lang.get(0).children.item(7)?.innerHTML.trim()).should("contain", "data-mat-icon-name=\"delete\"");
    });
  });

  it("should load last languages on last button click", function () {
    cy.wait("@getLanguages");
    cy.get("div .mat-mdc-paginator-range-actions > :nth-child(5)").click();
    cy.get("table tbody").children().each((lang: JQuery<HTMLElement>, index: number) => {
      index += 20;
      let firstAppeared: Date;
      let userTimezoneOffset: number;
      let firstAppearedString: string | null = null;

      if (!!this["languages"].languages[index].firstAppeared) {
        firstAppeared = new Date(this["languages"].languages[index].firstAppeared);
        userTimezoneOffset = firstAppeared.getTimezoneOffset() * 60000;
        firstAppearedString = new Date(firstAppeared.getTime() + userTimezoneOffset).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric"
        });
      }

      cy.wrap(lang.get(0).children.item(0)?.innerHTML.trim()).should("eq", this["languages"].languages[index].name);
      cy.wrap(lang.get(0).children.item(1)?.innerHTML.trim()).should("eq", this["languages"].languages[index].creators.toString().replace(/,/g,", "));
      cy.wrap(lang.get(0).children.item(2)?.innerHTML.trim()).should("eq", this["languages"].languages[index].extensions.toString().replace(/,/g,", "));
      cy.wrap(lang.get(0).children.item(3)?.innerHTML.trim()).should("eq", firstAppearedString ?? "--");
      cy.wrap(lang.get(0).children.item(4)?.innerHTML.trim()).should("eq", this["languages"].languages[index].year.toString());
      cy.wrap(lang.get(0).children.item(5)?.children.item(0)?.innerHTML.trim()).should("eq", this["languages"].languages[index].wiki);
      cy.wrap(lang.get(0).children.item(6)?.children.item(0)?.innerHTML.trim()).should("contain", "data-mat-icon-name=\"edit\"");
      cy.wrap(lang.get(0).children.item(7)?.innerHTML.trim()).should("contain", "data-mat-icon-name=\"delete\"");
    });
  });

  it("should load previous 5 languages on previous button click", function () {
    cy.wait("@getLanguages");
    cy.get("div .mat-mdc-paginator-range-actions > :nth-child(5)").click();
    cy.get("div .mat-mdc-paginator-range-actions > :nth-child(3)").click();
    cy.get("table tbody").children().each((lang: JQuery<HTMLElement>, index: number) => {
      index += 15;
      let firstAppeared: Date;
      let userTimezoneOffset: number;
      let firstAppearedString: string | null = null;

      if (!!this["languages"].languages[index].firstAppeared) {
        firstAppeared = new Date(this["languages"].languages[index].firstAppeared);
        userTimezoneOffset = firstAppeared.getTimezoneOffset() * 60000;
        firstAppearedString = new Date(firstAppeared.getTime() + userTimezoneOffset).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric"
        });
      }

      cy.wrap(lang.get(0).children.item(0)?.innerHTML.trim()).should("eq", this["languages"].languages[index].name);
      cy.wrap(lang.get(0).children.item(1)?.innerHTML.trim()).should("eq", this["languages"].languages[index].creators.toString().replace(/,/g,", "));
      cy.wrap(lang.get(0).children.item(2)?.innerHTML.trim()).should("eq", this["languages"].languages[index].extensions.toString().replace(/,/g,", "));
      cy.wrap(lang.get(0).children.item(3)?.innerHTML.trim()).should("eq", firstAppearedString ?? "--");
      cy.wrap(lang.get(0).children.item(4)?.innerHTML.trim()).should("eq", this["languages"].languages[index].year.toString());
      cy.wrap(lang.get(0).children.item(5)?.children.item(0)?.innerHTML.trim()).should("eq", this["languages"].languages[index].wiki);
      cy.wrap(lang.get(0).children.item(6)?.children.item(0)?.innerHTML.trim()).should("contain", "data-mat-icon-name=\"edit\"");
      cy.wrap(lang.get(0).children.item(7)?.innerHTML.trim()).should("contain", "data-mat-icon-name=\"delete\"");
    });
  });

  it("should load first 5 languages on first button click", function () {
    cy.wait("@getLanguages");
    cy.get("div .mat-mdc-paginator-range-actions > :nth-child(5)").click();
    cy.get("div .mat-mdc-paginator-range-actions > :nth-child(2)").click();
    cy.get("table tbody").children().each((lang: JQuery<HTMLElement>, index: number) => {
      let firstAppeared: Date;
      let userTimezoneOffset: number;
      let firstAppearedString: string | null = null;

      if (!!this["languages"].languages[index].firstAppeared) {
        firstAppeared = new Date(this["languages"].languages[index].firstAppeared);
        userTimezoneOffset = firstAppeared.getTimezoneOffset() * 60000;
        firstAppearedString = new Date(firstAppeared.getTime() + userTimezoneOffset).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric"
        });
      }

      cy.wrap(lang.get(0).children.item(0)?.innerHTML.trim()).should("eq", this["languages"].languages[index].name);
      cy.wrap(lang.get(0).children.item(1)?.innerHTML.trim()).should("eq", this["languages"].languages[index].creators.toString().replace(/,/g,", "));
      cy.wrap(lang.get(0).children.item(2)?.innerHTML.trim()).should("eq", this["languages"].languages[index].extensions.toString().replace(/,/g,", "));
      cy.wrap(lang.get(0).children.item(3)?.innerHTML.trim()).should("eq", firstAppearedString ?? "--");
      cy.wrap(lang.get(0).children.item(4)?.innerHTML.trim()).should("eq", this["languages"].languages[index].year.toString());
      cy.wrap(lang.get(0).children.item(5)?.children.item(0)?.innerHTML.trim()).should("eq", this["languages"].languages[index].wiki);
      cy.wrap(lang.get(0).children.item(6)?.children.item(0)?.innerHTML.trim()).should("contain", "data-mat-icon-name=\"edit\"");
      cy.wrap(lang.get(0).children.item(7)?.innerHTML.trim()).should("contain", "data-mat-icon-name=\"delete\"");
    });
  });

  it("should display 10 languages on page size change", () => {
    cy.wait("@getLanguages");

    cy.get("div .mat-mdc-paginator-page-size-select").click();
    cy.get("div .mat-mdc-select-panel > :nth-child(2)").click();

    cy.get("table tbody").children().then((children: JQuery<HTMLElement>) => {
      cy.wrap(children.length).should("eq", 10);
    });
  });

  it("should display 20 languages on page size change", () => {
    cy.wait("@getLanguages");

    cy.get("div .mat-mdc-paginator-page-size-select").click();
    cy.get("div .mat-mdc-select-panel > :nth-child(3)").click();

    cy.get("table tbody").children().then((children: JQuery<HTMLElement>) => {
      cy.wrap(children.length).should("eq", 20);
    });
  });

  it("should display all languages on page size change", function () {
    cy.wait("@getLanguages");

    cy.get("div .mat-mdc-paginator-page-size-select").click();
    cy.get("div .mat-mdc-select-panel > :nth-child(4)").click();

    cy.get("table tbody").children().then((children: JQuery<HTMLElement>) => {
      cy.wrap(children.length).should("eq", this["languages"].languages.length);
    });
  });

  it("should display 5 languages on page size change", () => {
    cy.wait("@getLanguages");

    cy.get("div .mat-mdc-paginator-page-size-select").click();
    cy.get("div .mat-mdc-select-panel > :nth-child(4)").click();
    cy.get("div .mat-mdc-paginator-page-size-select").click();
    cy.get("div .mat-mdc-select-panel > :nth-child(1)").click();

    cy.get("table tbody").children().then((children: JQuery<HTMLElement>) => {
      cy.wrap(children.length).should("eq", 5);
    });
  });

  it("should take the user to the wiki link clicked", function () {
    cy.wait("@getLanguages");

    cy.get("table tbody").children().first().then((firstChild: JQuery<HTMLElement>) => {
      const wikiLink: string = this["languages"].languages[0].wiki;
      firstChild.get(0).children.item(5)?.children.item(0)?.click();
      cy.origin("https://en.wikipedia.org", { args: { wikiLink } }, ({ wikiLink }) => cy.url().should("eq", wikiLink));
    });
  });

  it("should take the user to the add page when 'Add Language' is clicked", () => {
    cy.wait("@getLanguages");
    cy.get("app-language-list > :nth-child(1) > :nth-child(1) > :nth-child(1)").click();
    cy.url().should("eq", "http://localhost:4200/add");
  });

  it("should take the user to the edit page when 'Edit' is clicked", () => {
    cy.wait("@getLanguages");
    cy.get("table tbody").children().first().then((firstChild: JQuery<HTMLElement>) => {
      firstChild.get(0).children.item(6)?.children.item(0)?.click();
      cy.url().should("eq", "http://localhost:4200/edit/1");
    });
  });

  it("should open the delete modal when 'Delete' is clicked", () => {
    cy.wait("@getLanguages");
    cy.get("table tbody").children().first().then((firstChild: JQuery<HTMLElement>) => {
      firstChild.get(0).children.item(7)?.children.item(0)?.click();
      cy.get("mat-dialog-container").should("be.visible");
    });
  });
});
