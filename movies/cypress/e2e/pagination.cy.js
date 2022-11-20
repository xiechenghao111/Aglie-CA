
let movies_page;
let movies;

describe("Pagination", () => {
    before(() => {
      // Get the discover movies from TMDB and store them locally.
      cy.request(
        `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
          "TMDB_KEY"
        )}&language=en-US&include_adult=false&include_video=false&page=2`
      )
        .its("body") // Take the body of HTTP response from TMDB
        .then((response) => {
            movies_page = response.results
          })
    
    });
    beforeEach(() => {
      cy.visit("/movies");
    });
    it ("should display Icon of Pagination", () =>{
        cy.get(".MuiPagination-root").contains("1");
    } )
    
    it("should display certain page of movies after clicking according page button", () => {
        Cypress.on('uncaught:exception', () => false)
        cy.get(".MuiPagination-ul").find("li").eq(3).click();
        cy.get(".MuiCardHeader-content").each(($card, index) => {
            cy.wrap($card).find("p").contains(movies_page[index].title);
          });
      });
     
      });
   
  
