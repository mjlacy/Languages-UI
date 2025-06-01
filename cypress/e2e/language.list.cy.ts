describe("My First Test", () => {
  beforeEach(function () {
    cy.fixture("mockData.json").as("languages").then(() => {
      cy.setInterceptors(this["languages"]).then(() => {
        cy.visit("/");
      });
    });
  });

  it("should have headings", function () {
    const headings: string[] = ["Name", "Creators", "Extensions", "First Appeared", "Year", "Wiki", "Edit", "Delete"];

    cy.get("table thead tr").children().each((heading: JQuery<HTMLElement>, index: number) => {
      cy.wrap(heading.get(0).innerText).should("eq", headings[index]);
    });
  });

  it("should load 5 languages initially", function () {
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
    });
  });
});
