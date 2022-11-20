let TVs; 
let TV; 

describe("TV Base", () => {
  before(() => {
    
    cy.request(
      `https://api.themoviedb.org/3/discover/tv?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`
       
    )
      .its("body") 
      .then((response) => {
        TVs = response.results;
      });
  });
  beforeEach(() => {
    cy.visit("/movies/TV");
  });

  describe("The Discover TV page", () => {
    it("displays the page header and 20 TVs", () => {
      cy.get("h3").contains("Discover TV");
      cy.get(".MuiCardHeader-root").should("have.length", 20);
    });

    it("displays the correct TV titles", () => {
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(TVs[index].name);
      });
    });
  });

  
  describe("The TV details page", () => {
    before(() => {
      cy.request(
        `https://api.themoviedb.org/3/tv/${TVs[2].id}?api_key=cd337e2cdf6450aa6801acff1fa9bee5&language=en-US`
      )
        .its("body")
        .then((TVDetails) => {
          TV = TVDetails;
        });
    });
    beforeEach(() => {
      cy.visit(`/TV/${TVs[2].id}`);
    });
    it(" displays the movie title, overview and genres  ", () => {
      cy.get("h3").contains(TV.name);
      cy.get("h3").contains("Overview");
      cy.get("h3").next().contains(TV.overview);
      cy.get("ul")
        .eq(1)
        .within(() => {
          const genreChipLabels = TV.genres.map((g) => g.name);
          genreChipLabels.unshift("Genres");
          cy.get("span").each(($card, index) => {
            cy.wrap($card).contains(genreChipLabels[index]);
          });
        });
    });
  });
});