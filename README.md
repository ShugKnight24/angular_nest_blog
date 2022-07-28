# Angular NestJS Blog

Blog ToDo to learn the fundamentals of Angular, NestJS, and Postgres and see how they all interact

Using ElephantSQL for a Postgres DB

## Using the Nest API

Add an `.env` file w/ your `DATABASE_URL` string. View `.example.env` as an example
Run with `npm run start:dev`

## To-Dos
- [ ] Look into [cypress-axe](https://www.npmjs.com/package/cypress-axe) for accessibility testing
- [ ] Add reporting with Mocha/Chai
- [ ] Figure out how to automate Register form w/ Cypress
  - How to create / randomize a username and email
  - Tests for all fields
  - Pass all password checks
  - Submit form
- [ ] Prevent duplicate emails from registering
- [ ] Resolve why users page pagination is not working properly
  - Improve implemention around `limit` which is the source of this issue
  - Improve styles of paginator select not looking good over the page
- [ ] Only display `Users` and `Admin` routes if user has the admin role
- [ ] Improve use of SCSS themeing
  - Add a dark mode
  - Figure out if passing theme to mixin to style components is the best way to do this
- [ ] Refactor services by utilizing Subjects and unsubscribing from Observables
- [ ] Refactor project structure
- [ ] Research Input autocomplete
- [ ] Improve custom errors in login & register forms
- [ ] Move endpoint docs to a separate file
- [ ] Use concurrently for running angular and nest simultaneously
- [ ] Add Swagger Page
- [ ] Add DAOs and DTOs
- [ ] Improve security around endpoints... only admins or the current user can update info of the current user
- [ ] Update documentation to illustrate changes to login flow... illustrate need to delete DB / old records if having issues connecting to DB
- [ ] Improve CRUD Endpoint error handling
- [ ] Fix bcrypt import error / eslint error

## Change Log
- Follow all changes made in the [Changelog](./CHANGELOG.md)

## Running Angular
`cd` into the `blog` directory, run `npm install` to install the project dependencies, and run the `ng serve` command to start the development server which defaults to port 4200

## Running Cypress

`cd` into the `e2e` directory, run `npm install` to install the project dependencies, and then run either `npx cypress open` or `npm run cypress:open` commands and this will open the Cypress app which will allow you to run e2e tests or unit tests against your components

## Running Nest Server

`cd` into the `api` directory, run `npm install` to install the project dependencies, and then run the `npm run start:dev` command this will start the nest API on port 3000

You can use Postman or a similar app to test the endpoint by using different methods

## API Endpoint Documentation
- See thorough documenation of endpoints in the [API Docs](./API_DOCS.md) and find the accompanying Postman Collections in the [Postman directory](./postman).
