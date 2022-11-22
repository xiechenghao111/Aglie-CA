let movies;
let movieId; 
let movies_page;
describe("Navigation", () => {
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
  describe("From the home page to a movie's details", () => {
    it("navigates to the movie details page and change browser URL", () => {
      cy.clickLink('More Info ...');  //Cypress Custom commands Click link containing text
      cy.url().should("include", `/movies/${movies[0].id}`);
    });
  });
  
  describe("The site header", () => {
    describe("when the viewport is desktop scale", () => {
      it("navigation via the links", () => {
        cy.get("button").contains("Favorites").click();
        cy.url().should("include", `/favorites`);
        cy.get("button").contains("Home").click();
        cy.url().should("include", `/`);
        cy.get("button").contains("Upcoming").click();
        cy.url().should("include",'/upcoming');
        cy.get("button").contains("Toprated").click();
        cy.url().should("include",'/toprated');
        cy.get("button").contains("People").click();
        cy.url().should("include",'/people');
        cy.get("button").contains("TV").click();
        cy.url().should("include",'/TV');
        cy.get("button").contains("Login").click();
        cy.url().should("include",'/login');
      });
    });
    describe(
      "when the viewport is a mobile scale",
      {
        viewportHeight: 896,
        viewportWidth: 414,
      },
      () => {
        it("navigation via the dropdown menu", () => {
          cy.get("header").find("button").click();
          cy.get("li").contains('Favorites').click();
          cy.url().should("include", `/favorites`);
          cy.get("li").contains('Home').click();
          cy.url().should("include", `/`);
          cy.get("li").contains('Upcoming').click();
          cy.url().should("include", `/upcoming`);
          cy.get("li").contains('Toprated').click();
          cy.url().should("include", `/toprated`);
          cy.get("li").contains('People').click();
          cy.url().should("include", `/people`);
          cy.get("li").contains('TV').click();
          cy.url().should("include", `/TV`);
          cy.get("li").contains('Login').click();
          cy.url().should("include", `/login`);
        });
      }
    );
  });
  

describe("From the top rated page", () => {
    it("should navigate to the top rated movie details page and change browser URL", () => {
      cy.get("header").find(".MuiToolbar-root").find("button").eq(4).click({force: true});
      cy.url().should("include", `/movies/toprated`);
      cy.get("h3").contains("Toprated Movies");
    });
  });

  describe("From the people page", () => {
   
    it("should navigate to the people details page and change browser URL", () => {
      cy.get("header").find(".MuiToolbar-root").find("button").eq(5).click({force: true});
      cy.url().should("include", `/movies/people`);
      cy.get("h3").contains("Famous People");
     
    });
  });

  describe("From the TV page", () => {
 
    it("should navigate to the TV details page and change browser URL", () => {
      cy.get("header").find(".MuiToolbar-root").find("button").eq(6).click({force: true});
      cy.url().should("include", `/movies/TV`);
      cy.get("h3").contains("Discover TV");
     
    });
});

describe("From the Login page", () => {
 
    it("should navigate to the login details page and change browser URL", () => {
      cy.get("header").find(".MuiToolbar-root").find("button").eq(0).click({force: true});
      cy.url().should("include", `/login`);
      cy.get("h1").contains("Auth0 Login");
     
    });
});
describe("From the upcoming page", () => {
  it("should navigate to the upcoming movie details page and change browser URL", () => {
    cy.get("header").find(".MuiToolbar-root").find("button").eq(3).click({force: true});
    cy.url().should("include", `/movies/upcoming`);
    cy.get("h3").contains("Upcoming Movies");
   
  });
});
describe("Pagination", () => {
  before(() => {
    
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=2`
    )
      .its("body") 
      .then((response) => {
          movies_page = response.results
        })
  
  });
  beforeEach(() => {
    cy.visit("/movies");
  });
  
  it("should display certain page of movies after clicking according page button", () => {
      Cypress.on('uncaught:exception', () => false)
      cy.get(".MuiPagination-ul").find("li").eq(3).click();
      cy.get(".MuiCardHeader-content").each(($card, index) => {
          cy.wrap($card).find("p").contains(movies_page[index].title);
        });
    });
   
    });
 



});
