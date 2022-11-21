let review;
let movies; 

describe("Base tests", () => {
  before(() => {

    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body") 
      .then((response) => {
        movies = response.results;
      
      });
  });
  beforeEach(() => {
    cy.visit("/");
  });

  describe("The movie details page", () => {
    before(() => {
      cy.request(
        `https://api.themoviedb.org/3/movie/${
          movies[0].id
        }?api_key=${Cypress.env("TMDB_KEY")}`
      )
        .its("body")
        .then((movieDetails) => {
          movie = movieDetails;
        });
    });
  });
describe("moviereview tests", () => {
  before(() => {
   
    cy.request(
      `https://api.themoviedb.org/3/movie/${ movies[0].id}/reviews?api_key=${Cypress.env("TMDB_KEY")}`
    )
      .its("body") 
      .then((response) => {
        movies = response.results;
      });
  });
  beforeEach(() => {
    cy.visit(`/movies/436270`);
  });

  describe("The Review ", () => {
    it("displays review button", () => {
     
      cy.get(".MuiGrid-grid-xs-9>button").contains("Reviews");
     
    });

    

    
    
  });
  describe("moviereview content tests", () => {
    before(() => {
     
      cy.request(
        `https://api.themoviedb.org/3/movie/${ movies[0].id}/reviews?api_key=${Cypress.env("TMDB_KEY")}`
      )
        .its("body") 
        .then((response) => {
          review = response.results;
        });
    });
    beforeEach(() => {
      cy.visit(`/movies/436270`);
    });
  it("displays review page", () => {

   cy.get(".MuiGrid-grid-xs-9>button").click();

    cy.get(".MuiTableHead-root tr th").eq(0).contains("Author");
    cy.get(".MuiTableHead-root tr th").eq(1).contains("Excerpt");
    cy.get(".MuiTableHead-root tr th").eq(2).contains("More");
    cy.get(".MuiTableRow-root  td").eq(1).contains("Full Review");
   
  });
});
});


});