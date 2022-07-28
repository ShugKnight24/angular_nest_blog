# Endpoint Documentation

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
  Get Requests - The base endpoint is protected by a guard that requires an admin role. Passing in no params and a JWT access token from a user with an admin role will get an array of all the users. This endpoint supports pagination.

  Passing the specific user id will return a single user, this endpoint is not protected by a guard.

  #### Get All Users
  Target: Base URL
  Required role: 'admin'
  Method: GET

  Authorization: Bearer Token -> Pass in the `JWT Token` reponse received from the `/login` endpoint as a bearer token. This will ensure the user has the correct role to access this endpoint 

  Example request body: no params or can pass in pagination params to get a specific page of users. The limit can be set in the `.env` file. Look at `example.env` under the `USER_PAGINATION_LIMIT` string. This will also return a links object that has urls to `first`, `previous`, `next`, and `last` pages. There is also an optional `username` param that will return a list of users that match the username

  ``` json
  {
    "page": 1,
    "limit": 10,
    "route": "http://localhost:3000/users",
	"username": "shugknight24"
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