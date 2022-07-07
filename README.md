# Angular NestJS Blog

Blog ToDo to learn the fundamentals of Angular, NestJS, and Postgres and see how they all interact

Using ElephantSQL for a Postgres DB

## Using the Nest API

Add an `.env` file w/ your `DATABASE_URL` string. View `.example.env` as an example
Run with `npm run start:dev`

## To-Dos
- [ ] Test changes
  - Add updated Postman collection
- [ ] Update documentation to illustrate changes to login flow... illustrate need to delete DB / old records if having issues connecting to DB
- [ ] Fix bcrypt import error / eslint error
- [ ] Angular Frontend

## Change Log
- Follow all changes made in the [Changelog](./CHANGELOG.md)

## Running Nest Server

cd into the `api/src` directory and run the `npm run start:dev` command this will start the nest API on port 3000

You can use Postman or a similar app to test the endpoint by using different methods

### Users Endpoint

  Postman collection added in the `postman` directory

  url `localhost:3000/users/`
  #### Create
  Post request - Pass a name and username as raw body via JSON

  Example:
  ``` json
  {
    "name": "Shugmi Test",
    "username": "shugknight24"
  }
  ```

  #### Read
  Get Request - Pass no params to get all the users, pass the specific user id to return a single user

  #### Update
  Put Request - Pass in user id and then pass in the updated user object
Example:
  ``` json
  {
    "name": "Shugmi Test Updated",
    "username": "shugknight"
  }
  ```

  #### Delete
  Delete Request - Pass a specific user's ID to delete a user