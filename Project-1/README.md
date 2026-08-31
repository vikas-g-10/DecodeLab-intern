# Backend Development - Project 1

## REST API Fundamentals

This project is a basic REST API built using Node.js and Express.js.

The purpose of this project is to demonstrate:

* Creating a local web server
* Creating GET and POST routes
* Returning structured JSON data
* Handling invalid routes
* Validating POST data
* Organizing routes into a separate module

## Technologies Used

* Node.js
* Express.js
* Postman

## Project Structure

```text
Backend-Project-1
│
├── routes
│   └── studentRoutes.js
├── server.js
├── package.json
└── package-lock.json
```

## Installation

Clone or download the project and open the project folder in the terminal.

Install the required dependencies:

```bash
npm install
```

## Running the Server

Start the server using:

```bash
node server.js
```

The server will run at:

```text
http://localhost:3000
```

## API Endpoints

### 1. GET /students

Returns a list of students.

**Request:**

```text
GET http://localhost:3000/students
```

**Example Response:**

```json
[
    {
        "id": 1,
        "name": "Vikas",
        "Branch": "CSE-AIML"
    },
    {
        "id": 2,
        "name": "Varshith",
        "Branch": "CSE-AIML"
    }
]
```

### 2. POST /students

Receives student information.

**Request:**

```text
POST http://localhost:3000/students
```

**Request Body:**

```json
{
    "name": "Harsh",
    "Branch": "CSE-AIML"
}
```

**Example Response:**

```json
{
    "message": "Student received successfully",
    "student": {
        "name": "Harsh",
        "Branch": "CSE-AIML"
    }
}
```

## Error Handling

### 404 - Route Not Found

If an unknown route is requested, the server returns:

```json
{
    "error": "Route not found"
}
```

### 400 - Bad Request

If the POST request does not contain both `name` and `course`, the server returns:

```json
{
    "error": "Name and course are required"
}
```

## Testing

The API was tested using Postman.

The following were tested successfully:

* GET /students
* POST /students with valid data
* POST /students with missing data
* Invalid routes

## Conclusion

This project demonstrates the fundamentals of REST API development using Node.js and Express.js, including routing, HTTP methods, JSON responses, validation, and basic error handling.
