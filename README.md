# Assignment 1 - Agile Software Practice.

__Name:__ chenghaoxie

This repository contains the implementation of a React App and its associated Cypress tests and GitLab CI pipeline.

## React App Features.

+ Feature 1 Add new page- Toprated movie page
+ Feature 2 Add new page- Peope page
+ Feature 3 Add new page- People detail page
+ Feature 4 Add new page- TV page
+ Feature 5 Add new page- TV detail page
+ Feature 6 Add the review on the TV detail page
+ Feature 7 Add a new filter function
+ Feature 8 Add the pagination of page
+ Feature 9 Add the third-party authentication

## Automated Tests.

+ Test 1 moviereview test - test the review button and test the review page after click the button
+ Test 2 navigation test - test site header navigation to other page and use custom commands to rewrite the navigation of more information and the navigation of the pagination 
+ Test 3 pagination test - find the Icon of the pagination and display the correct page after click the number of page.
+ Test 4 peoplebase test - test the people card list of the people page, the name of each people and the display of the people detail page.
+ Test 5 topratedmovie test - test the movie list and the title of the movies, test the filter card function of the topratedmovie page, test the display of the movie detail page, test the movie genres in movie detail page, test the reviews of the toprated movie page and because some movies do not have the review, these movies should display the header of the review page, it is an error/exception testing.
+ Test 6 tvbase test - test the tv list of the tv page and the title of tv and display the tv detail page.
+ Test 7 upcoming movie test - test the movie list and title of the movie, test the filter card, test the display of the movie detail page and test the genres of the movies.

### Best test cases.

+ cypress/e2e/navigation.cy.js
+ cypress/e2e/TopRatedMovie.cy.js

### Cypress Custom commands (if relevant).

+ cypress/e2e/navigation.cy.js


## Code Splitting.

+ src/index.js

## Pull Requests.

https://github.com/xiechenghao111/Aglie-CA/pulls?q=is%3Apr+is%3Aclosed

## Independent learning (If relevant).

I use the continuous integration of the auto-deployment. Use GitHub Pages, and you can see my web in the path "https://xiechenghao111.github.io/Aglie-CA"

