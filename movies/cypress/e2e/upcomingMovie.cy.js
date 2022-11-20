let movies;    
let movie;
const filterByTitle = (movieList, string) =>
  movieList.filter((m) => m.title.toLowerCase().search(string) !== -1);

const filterByGenre = (movieList, genreId) =>
  movieList.filter((m) => m.genre_ids.includes(genreId));

describe("Upcoming Page ", () => {
  before(() => {
  
    cy.request(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${Cypress.env("TMDB_KEY")}&language=en-US&page=1`
    )
      .its("body")    
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
  describe("Filtering", () => {
    describe("By movie title", () => {
     it("should only display movies with m in the title", () => {
       let searchString = "m";
       let matchingMovies = filterByTitle(movies, searchString);
       cy.get("#filled-search").clear().type(searchString); 
       cy.get(".MuiCardHeader-content").should(
         "have.length",
         matchingMovies.length
       );
       cy.get(".MuiCardHeader-content").each(($card, index) => {
         cy.wrap($card).find("p").contains(matchingMovies[index].title);
       });
     })
     it("should only display movies with o in the title", () => {
       let searchString = "o";
       let matchingMovies = filterByTitle(movies, searchString);
       cy.get("#filled-search").clear().type(searchString); // Enter m in text box
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
  
          cy.get("#filled-search").clear().type(searchString); 
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
        beforeEach(() => {
          cy.visit(`/movies/${movies[0].id}`);
        });
        it(" displays the movie title, overview and genres ", () => {
          cy.get("h3").contains(movie.title);
          cy.get("h3").contains("Overview");
          cy.get("h3").next().contains(movie.overview);
          cy.get("ul")
            .eq(1)
            .within(() => {
              const genreChipLabels = movie.genres.map((g) => g.name);
              genreChipLabels.unshift("Genres");
              cy.get("span").each(($card, index) => {
                cy.wrap($card).contains(genreChipLabels[index]);
              });
            });
  });
     });
    });

