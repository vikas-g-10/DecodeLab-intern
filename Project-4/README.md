# Backend Development - Project 4

## Third-Party API Integration

This project demonstrates how to integrate a third-party API with a Node.js and Express.js backend.

The project uses WeatherAPI to fetch current weather information, process the external API response, and return clean JSON data to the user.

The purpose of this project is to demonstrate:

* Secure API key management using environment variables
* Fetching data from an external API
* Asynchronous programming using `async/await`
* Reformatting external API responses
* Input validation
* Error handling
* Testing APIs using Postman

## Technologies Used

* Node.js
* Express.js
* Axios
* WeatherAPI
* dotenv
* Postman
* REST API

## Project Structure

```text
Project-4/
│
├── .gitignore
├── README.md
├── package.json
├── package-lock.json
└── server.js
```

## Important Files

### `server.js`

Contains:

* Express.js server configuration
* Home route
* Health check route
* Weather API route
* External API request using Axios
* Asynchronous programming using `async/await`
* Input validation
* Error handling
* Weather response formatting

### `.env`

Stores sensitive configuration such as the WeatherAPI key.

Example:

```env
WEATHER_API_KEY=your_weatherapi_key
PORT=5000
```

The actual `.env` file is excluded from GitHub using `.gitignore`.

## Installation

Clone the repository and open the Project-4 directory:

```bash
git clone https://github.com/vikas-g-10/DecodeLab-intern.git
cd DecodeLab-intern/Project-4
```

Install the required dependencies:

```bash
npm install
```

## Environment Configuration

Create a `.env` file inside the `Project-4` directory:

```env
WEATHER_API_KEY=your_weatherapi_key
PORT=5000
```

Replace `your_weatherapi_key` with your WeatherAPI key.

The API key should not be shared publicly or committed to GitHub.

## Running the Server

Start the server using:

```bash
node server.js
```

The server will run at:

```text
http://localhost:5000
```

## API Endpoints

### 1. GET /

Returns basic information about the project.

Request:

```text
GET http://localhost:5000/
```

Example Response:

```json
{
  "message": "Weather API Backend"
}
```

### 2. GET /health

Checks whether the backend server is running.

Request:

```text
GET http://localhost:5000/health
```

Example Response:

```json
{
  "status": "OK",
  "service": "Weather API"
}
```

### 3. GET /weather/:city

Fetches current weather information for the requested city.

Request:

```text
GET http://localhost:5000/weather/Bengaluru
```

Example Response:

```json
{
  "city": "Bengaluru",
  "country": "India",
  "temperature_c": 21.9,
  "condition": "Light rain shower",
  "humidity": 84,
  "wind_kph": 13.7
}
```

The actual weather values may change because the data is retrieved from the external WeatherAPI service.

## Error Handling

### 404 - City Not Found

If the requested city does not exist:

```json
{
  "error": "City not found"
}
```

### 500 - External API or Server Error

If another error occurs while communicating with the external API:

```json
{
  "error": "Unable to fetch weather data"
}
```

### 400 - Invalid Request

The API validates the requested city before making the external API request.

## Data Flow

```text
Client
   │
   ▼
Express.js Backend
   │
   ▼
WeatherAPI
   │
   ▼
External Weather Data
   │
   ▼
Backend Processing
   │
   ▼
Formatted JSON Response
   │
   ▼
Client
```

## Testing

The API was tested using Postman.

The following requests were tested successfully:

* `GET /`
* `GET /health`
* `GET /weather/Bengaluru`
* `GET /weather/Mumbai`
* Invalid city request
* API error handling

## Security

The project follows basic security practices:

* WeatherAPI key is stored in `.env`.
* `.env` is excluded from GitHub.
* API credentials are not included in the source code.
* The API key is not returned in API responses.
* External API errors are handled by the backend.
* Only required weather information is returned to the client.

## Key Learning Outcomes

This project provided practical experience with:

* Third-party API integration
* REST API development
* Axios
* Asynchronous programming
* `async/await`
* Environment variables
* API key management
* Input validation
* Error handling
* Response transformation
* Postman API testing
* Git and GitHub

## Conclusion

This project demonstrates how a backend application can securely communicate with a third-party API, process external data, and provide a clean and simplified response to its users.

It provides practical experience in asynchronous programming, API integration, environment variable management, response formatting, and backend error handling.

## Author

Vikas G

DecodeLabs Internship

GitHub: https://github.com/vikas-g-10

## Repository

The DecodeLabs internship repository contains all completed backend projects:

```text
DecodeLab-intern/
├── Project-1/
├── Project-2/
├── Project-3/
└── Project-4/
```
