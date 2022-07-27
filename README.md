# Angular NestJS Blog

Blog ToDo to learn the fundamentals of Angular, NestJS, and Postgres and see how they all interact

Using ElephantSQL for a Postgres DB

## Using the Nest API

Add an `.env` file w/ your `DATABASE_URL` string. View `.example.env` as an example
Run with `npm run start:dev`

## To-Dos
- [ ] Add a section for running cypress
- [ ] Add a section for running angular
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

## Running Nest Server

cd into the `api/src` directory and run the `npm run start:dev` command this will start the nest API on port 3000

You can use Postman or a similar app to test the endpoint by using different methods

## Users Endpoint

  Postman collection added in the `postman` directory

  Base URL: `localhost:3000/users/`
  ### Create
  Post request - Pass a name and username as raw body via JSON

  Target: Base URL
  Method: POST
  Example request body:
  ``` json
  {
    "name": "Shugmi Test",
    "username": "shugknight24",
    "email": "test@test.com",
    "password": "testPass123!",
    "role": "will not work - defaults to user"
  }
  ```

  ### Read
  Get Request - Pass no params to get all the users, pass the specific user id to return a single user

  #### Get All Users
  Target: Base URL
  Required role: 'admin'
  Method: GET

  Authorization: Bearer Token -> Pass in the `JWT Token` reponse received from the `/login` endpoint as a bearer token. This will ensure the user has the correct role to access this endpoint 

  Example request body: none or can pass in pagination params to get a specific page of users. The limit can be set in the `.env` file. Look at `example.env` under the `USER_PAGINATION_LIMIT` string. This will also return a links object that has urls to `first`, `previous`, `next`, and `last` pages

  ``` json
  {
    "page": 1,
    "limit": 10,
    "route": "http://localhost:3000/users"
  }
  ```

  #### Get One User
  Target: Base URL/:id
  Method: GET
  Example request body
  ``` json
  {
    "id": "1"
  }
  ```

  ### Update
  Put Request - Pass in user id and then pass in the updated user object. The email and password fields will not be updated due to the fact they are deleted in the `updateOne` method inside of the user service

  Target: Base URL/:id
  Method: PUT
  Example request body
  ``` json
  {
    "name": "Shugmi Test Updated",
    "username": "shugknight",
    "email": "will not work",
    "password": "will not work",
    "role": "will not work"
  }
  ```

  ### Update User Role
  Target: Base URL/:id/role
  Required role: 'admin'
  Method: PUT
  Authorization: Bearer Token -> Pass in the `JWT Token` reponse received from the `/login` endpoint as a bearer token. This will ensure the user has the correct role to access this endpoint 

  Example request body
  ``` json
  {
    "role": "admin" | "editor" | "publisher" | "user" (default)
  }
  ```
  ### Delete
  Delete Request - Pass a specific user's ID to delete a user

  Target: Base URL/:id
  Method: DELETE
  Example request body
  ``` json
  {
    "id": "1"
  }
  ```

  ### Login
  Post Request - Pass a username and password as raw body via JSON to get a JWT token back. Can check the contents of that token at [jwt.io](https://jwt.io/)

  Target: Base URL/login
  Method: POST
  Example request body
  ``` json
  {
    "email": "user email",
    "password": "user password",
  }
  ```