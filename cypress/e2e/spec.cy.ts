describe("My First Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should have headings", () => {
    const headings: string[] = ["Name", "Creators", "Extensions", "First Appeared", "Year", "Wiki", "Edit", "Delete"];

    cy.get("table thead tr").children().each((heading: JQuery<HTMLElement>, index: number) => {
      cy.wrap(heading.get(0).innerText).should("eq", headings[index]);
    });

  });
});
