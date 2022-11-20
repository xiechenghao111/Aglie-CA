let movies;    // List of movies from TMDB

// Utility functions
const filterByTitle = (movieList, string) =>
  movieList.filter((m) => m.title.toLowerCase().search(string) !== -1);

const filterByGenre = (movieList, genreId) =>
  movieList.filter((m) => m.genre_ids.includes(genreId));

describe("Upcoming Page ", () => {
  before(() => {
    // Get upcoming movies from TMDB and store in movies variable.
    cy.request(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&page=1`
    )
      .its("body")    // Take the body of HTTP response from TMDB
      .then((response) => {
        movies = response.results
      })
  })
  beforeEach(() => {
    cy.visit("/movies/upcoming")
  });

  describe("Base tests", () => {
    it("displays page header", () => {
      cy.get("h3").contains("Upcoming Movies");
      cy.get("h1").contains("Filter the movies");
    });
  });

 
   describe("By movie genre" ,() => {
    it("should display movies with the specified genre only", () => {
        const selectedGenreId = 35;
        const selectedGenreText = "Comedy";
        const matchingMovies = filterByGenre(movies, selectedGenreId);
        cy.get("#genre-select").click();
        cy.get("li").contains(selectedGenreText).click();
        cy.get(".MuiCardHeader-content").should(
          "have.length",
          matchingMovies.length
        );
        cy.get(".MuiCardHeader-content").each(($card, index) => {
          cy.wrap($card).find("p").contains(matchingMovies[index].title);
        });
      });
    });

    describe("By movie title and genre", ()=>{
      it("should only display movies with m in the title and the specified genre", ()=>{
          let searchString="m";
          let matchingMovies=filterByTitle(movies,searchString);
  
          const selectedGenreId=35;
          const selectedGenreText="Comedy";
          matchingMovies=filterByGenre(matchingMovies,selectedGenreId);
  
          cy.get("#filled-search").clear().type(searchString); // Enter m in text box
          cy.get("#genre-select").click();
          cy.get("li").contains(selectedGenreText).click(); //Choose comedy genre
          cy.get(".MuiCardHeader-content").should(
            "have.length",
            matchingMovies.length
          );
          cy.get(".MuiCardHeader-content").each(($card, index) => {
            cy.wrap($card).find("p").contains(matchingMovies[index].title);
          });
      });
     });
  });
