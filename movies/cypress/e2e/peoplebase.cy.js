let persons; 
let people; 

describe("Base tests", () => {
  before(() => {
  
    cy.request(
      `https://api.themoviedb.org/3/person/popular?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&page=1`
    )
      .its("body") 
      .then((response) => {
        persons = response.results;
      });
  });
  beforeEach(() => {
    cy.visit("/movies/people");
  });

  describe("The People page", () => {
    it("displays the page header and 20 people", () => {
        cy.get("h3").contains("Famous People");
      cy.get(".MuiCardHeader-root").should("have.length", 20);
    });

    it("displays the correct people name", () => {
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(persons[index].name);
      });
    });
  });

  
  describe("The people details page", () => {
    before(() => {
      cy.request(
        `https://api.themoviedb.org/3/person/${
          persons[0].id
        }?api_key=${Cypress.env("TMDB_KEY")}`
      )
        .its("body")
        .then((peopleDetails) => {
          people = peopleDetails;
        });
    });
    beforeEach(() => {
      cy.visit(`/people/${persons[0].id}`);
    });
    it(" displays the people title, Biography  ", () => {
      cy.get("h3").contains(people.name);
      cy.get("h3").contains("Biography");
     
     
         
    });
  });
});