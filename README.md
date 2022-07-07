# Angular NestJS Blog

Blog ToDo to learn the fundamentals of Angular, NestJS, and Postgres and see how they all interact

Using ElephantSQL for a Postgres DB

## Using the Nest API

Add an `.env` file w/ your `DATABASE_URL` string. View `.example.env` as an example
Run with `npm run start:dev`

## To-Dos
- [ ] Update documentation to illustrate changes to login flow... illustrate need to delete DB / old records if having issues connecting to DB
- [ ] Improve CRUD Endpoint error handling
- [ ] Fix bcrypt import error / eslint error
- [ ] Angular Frontend

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
    "password": "testPass123!"
  }
  ```

  ### Read
  Get Request - Pass no params to get all the users, pass the specific user id to return a single user

  #### Get All Users
  Target: Base URL
  Method: GET
  Example request body: none

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
    "username": "shugknight"
    "email": "will not work",
    "password": "will not work"
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
    "id": "1"
  }
  ```