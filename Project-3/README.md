# Backend Development - Project 3

## Secure Authentication System

This project is a secure authentication and authorization REST API built using Node.js, Express.js, PostgreSQL, Prisma ORM, bcrypt, and JSON Web Token (JWT).

The purpose of this project is to demonstrate:

* Hashing user passwords before storing them
* User registration and login
* Generating JWT tokens after successful login
* Protecting API routes using authentication middleware
* Validating JWT tokens
* Token expiration
* Role-based access control for Admin and User accounts

## Technologies Used

* Node.js
* Express.js
* PostgreSQL
* Prisma ORM
* bcrypt
* JSON Web Token (JWT)
* dotenv
* Postman

## Project Structure

```text
Project-3/
│
├── lib/
│   └── prisma.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── requireRole.js
│
├── prisma/
│   ├── migrations/
│   │   └── ... migration files
│   └── schema.prisma
│
├── .gitignore
├── package.json
├── package-lock.json
├── prisma7.config.ts
├── server.js
└── README.md
```

### Important Files

* `server.js` — Express.js server and authentication API implementation.
* `lib/prisma.js` — Prisma Client and PostgreSQL database connection.
* `middleware/authMiddleware.js` — Verifies JWT tokens and protects routes.
* `middleware/requireRole.js` — Checks whether the authenticated user has the required role.
* `prisma/schema.prisma` — Defines the User database model.
* `prisma/migrations/` — Contains database migration files.

## Database

The application uses PostgreSQL for storing user information.

The Project 3 database is:

```text
backend_project_3
```

The database connection is configured using the `DATABASE_URL` environment variable.

Example:

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/backend_project_3"
JWT_SECRET="your-secret-key"
PORT=5000
```

> The actual `.env` file is intentionally excluded from GitHub so that database credentials and JWT secrets remain private.

## Database Schema

The project uses the following User model:

```prisma
model User {
  id            Int      @id @default(autoincrement())
  email         String   @unique
  password_hash String
  role          String   @default("USER")
  created_at    DateTime @default(now())

  @@map("users")
}
```

New users are assigned the `USER` role by default.

## Prerequisites

Install the following before running the project:

* Node.js
* npm
* PostgreSQL
* Postman

Check the installations:

```bash
node --version
npm --version
psql --version
```

## Installation

Clone the repository:

```bash
git clone https://github.com/vikas-g-10/DecodeLab-intern.git
```

Navigate to Project 3:

```bash
cd DecodeLab-intern/Project-3
```

Install the required dependencies:

```bash
npm install
```

## Environment Configuration

Create a `.env` file inside the `Project-3` directory:

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/backend_project_3"
JWT_SECRET="your-secret-key"
PORT=5000
```

Replace `USERNAME`, `PASSWORD`, and `JWT_SECRET` with your local PostgreSQL credentials and a private JWT secret.

Do not upload the `.env` file to GitHub.

## Prisma Setup

Generate the Prisma Client:

```bash
npx prisma generate
```

Apply the database migrations:

```bash
npx prisma migrate dev
```

## Running the Server

Start the backend server:

```bash
node server.js
```

The server will run at:

```text
http://localhost:5000
```

## Authentication Flow

The authentication process works as follows:

```text
User Registration
       │
       ▼
Password Hashing
       │
       ▼
PostgreSQL Database
       │
       ▼
User Login
       │
       ▼
Password Verification
       │
       ▼
JWT Token Generated
       │
       ▼
Protected API Request
       │
       ▼
JWT Authentication Middleware
       │
       ▼
Protected Route
```

## API Endpoints

### 1. GET /

Health check endpoint.

Request:

```text
GET http://localhost:5000/
```

Example response:

```json
{
  "message": "DecodeLabs Project 3 - Secure Authentication API"
}
```

### 2. POST /auth/register

Registers a new user.

Request:

```text
POST http://localhost:5000/auth/register
```

Request Body:

```json
{
  "email": "user@example.com",
  "password": "User@12345"
}
```

The password is hashed using bcrypt before being stored in the database.

Example response:

```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

### 3. POST /auth/login

Authenticates an existing user and generates a JWT token.

Request:

```text
POST http://localhost:5000/auth/login
```

Request Body:

```json
{
  "email": "user@example.com",
  "password": "User@12345"
}
```

If the credentials are correct, the server returns a JWT token.

Example:

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```

The JWT token expires after 1 hour.

### 4. GET /protected

A protected route that requires a valid JWT token.

Request:

```text
GET http://localhost:5000/protected
```

Authorization:

```text
Bearer JWT_TOKEN
```

A valid token allows access to the route.

Without a valid token, the server returns:

```json
{
  "error": "Access token is required"
}
```

### 5. GET /admin

An Admin-only protected route.

Request:

```text
GET http://localhost:5000/admin
```

Authorization:

```text
Bearer JWT_TOKEN
```

Only users with the `ADMIN` role can access this route.

An Admin receives:

```text
200 OK
```

A normal User receives:

```text
403 Forbidden
```

## Password Security

Passwords are never stored as plain text.

During registration:

```text
Plain Password
      │
      ▼
bcrypt.hash()
      │
      ▼
Hashed Password
      │
      ▼
PostgreSQL
```

During login, `bcrypt.compare()` is used to verify the supplied password against the stored hash.

## JWT Authentication

After successful login, the server generates a JSON Web Token containing authenticated user information.

The token contains:

* User ID
* Email
* User role

The token is signed using the secret stored in the `.env` file.

The token is configured to expire after:

```text
1 hour
```

## Authentication Middleware

The `authMiddleware.js` middleware:

1. Checks whether an Authorization header exists.
2. Checks the `Bearer` token format.
3. Verifies the JWT.
4. Checks whether the token is valid or expired.
5. Stores the decoded user information in `req.user`.
6. Allows the request to continue to the protected route.

Invalid or expired tokens return:

```text
401 Unauthorized
```

## Role-Based Access Control

The project also implements role-based authorization as an additional security feature.

Available roles:

```text
USER
ADMIN
```

New users automatically receive:

```text
USER
```

The `/admin` route requires:

```text
ADMIN
```

The authorization flow is:

```text
Request
   │
   ▼
JWT Authentication
   │
   ▼
Valid Token?
   │
   ├── No → 401 Unauthorized
   │
   ▼
Role Check
   │
   ▼
ADMIN?
   │
   ├── No → 403 Forbidden
   │
   ▼
Admin Route
```

## Error Handling

### 400 - Bad Request

Returned when required registration or login information is missing.

Example:

```json
{
  "error": "Email and password are required"
}
```

### 401 - Unauthorized

Returned when:

* Access token is missing
* Token is invalid
* Token is expired
* Login credentials are incorrect

### 403 - Forbidden

Returned when a valid user does not have permission to access an Admin-only route.

### 404 - Not Found

Returned when the requested user does not exist.

### 409 - Conflict

Returned when attempting to register an email that already exists.

### 500 - Internal Server Error

Returned when an unexpected server-side error occurs.

## Testing

The API was tested using Postman.

The following were tested successfully:

* User registration
* Password hashing
* Successful login
* Login with incorrect password
* JWT token generation
* Accessing protected route with a valid token
* Accessing protected route without a token
* Accessing protected route with an invalid token
* Admin access
* Normal user access to Admin route
* JWT token expiration
* PostgreSQL database connectivity
* Database persistence

Test results:

```text
ADMIN → /admin → 200 OK

USER → /admin → 403 Forbidden

Missing Token → /protected → 401 Unauthorized

Invalid Token → /protected → 401 Unauthorized
```

## Security

The project follows basic security practices:

* Passwords are hashed using bcrypt.
* Passwords are never stored as plain text.
* JWT secrets are stored in environment variables.
* JWT tokens expire after one hour.
* Protected routes require authentication.
* Admin routes require the appropriate role.
* New users receive the `USER` role by default.
* `.env` is excluded from version control.
* Generic authentication errors are returned instead of exposing sensitive information.

## Key Learning Outcomes

This project provided practical experience with:

* Authentication and authorization
* Password hashing
* bcrypt
* JSON Web Tokens
* JWT middleware
* Protected API routes
* Role-based access control
* PostgreSQL
* Prisma ORM
* Database migrations
* Environment variables
* REST API development
* Postman API testing
* Backend security practices
* Git and GitHub version control

## Conclusion

This project demonstrates how to build a secure authentication system using Node.js and Express.js.

It covers password hashing, user login, JWT-based authentication, protected routes, token expiration, and role-based authorization.

The project provides practical experience in implementing security mechanisms that are commonly used in modern backend applications.

## Author

**Vikas Yadav**

DecodeLabs Internship

GitHub: https://github.com/vikas-g-10

## Repository

The DecodeLabs internship repository contains the backend projects:

```text
DecodeLab-intern/
│
├── Project-1/
├── Project-2/
└── Project-3/
```
