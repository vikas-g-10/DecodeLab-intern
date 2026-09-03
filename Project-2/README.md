# DecodeLabs Backend Project 2

A RESTful backend API built with **Node.js, Express.js, PostgreSQL, and Prisma ORM** as part of the DecodeLabs internship.

##  Project Overview

This project demonstrates backend development fundamentals through a PostgreSQL-backed REST API. It includes CRUD operations, request validation, error handling, Prisma database integration, and persistent data storage.

The application was developed and tested locally with:

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- REST API endpoints

##  Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend web framework |
| PostgreSQL | Relational database |
| Prisma ORM | Database access and migrations |
| JavaScript | Backend programming language |
| REST API | Client-server communication |

##  Project Structure

```text
Project-2/
│
├── lib/
│   └── prisma.js
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
└── skills-lock.json
```

### Important Files

- **`server.js`** — Express.js server and API implementation.
- **`lib/prisma.js`** — Prisma Client/database connection configuration.
- **`prisma/schema.prisma`** — Database schema and Prisma models.
- **`prisma/migrations/`** — Database migration files.
- **`prisma7.config.ts`** — Prisma configuration.

##  Database

The application uses **PostgreSQL** for persistent data storage.

The database connection is configured through the `DATABASE_URL` environment variable.

Example:

```env
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/backend_project_2"
```

> The actual `.env` file is intentionally excluded from GitHub so database credentials remain private.

##  Prerequisites

Install the following before running the project:

- Node.js
- npm
- PostgreSQL

Check the installations:

```bash
node --version
npm --version
psql --version
```

##  Installation

Clone the repository:

```bash
git clone https://github.com/vikas-g-10/DecodeLab-intern.git
```

Navigate to Project 2:

```bash
cd DecodeLab-intern/Project-2
```

Install dependencies:

```bash
npm install
```

##  Environment Configuration

Create a `.env` file inside the `Project-2` directory:

```env
DATABASE_URL="your-postgresql-connection-string"
```

For a local PostgreSQL installation, the connection string follows this format:

```text
postgresql://USERNAME:PASSWORD@localhost:5432/DATABASE_NAME
```

Replace the values with your PostgreSQL username, password, and database name.

##  Prisma Setup

Generate the Prisma Client:

```bash
npx prisma generate
```

Apply the database migrations:

```bash
npx prisma migrate dev
```

##  Running the Server

Start the backend server:

```bash
node server.js
```

The application runs locally on:

```text
http://localhost:3000
```

##  API Functionality

The backend provides CRUD functionality for managing users/members.

The implemented functionality includes:

- **Create** — Add a new record.
- **Read** — Retrieve existing records.
- **Update** — Modify an existing record.
- **Delete** — Remove a record.

The API also handles validation and errors for invalid requests.

##  Testing

The application was tested locally to verify:

- Server startup
- PostgreSQL database connectivity
- Record creation
- Record retrieval
- Record updating
- Record deletion
- Validation and error handling
- Database persistence
- Creating a new record after deletion
- Persistence of data after restarting the server

Database connectivity and the final persistence test were successfully verified during development.

##  Data Persistence

Data is stored in PostgreSQL through Prisma rather than only in server memory.

The application follows this flow:

```text
Client
   │
   ▼
Express.js API
   │
   ▼
Prisma ORM
   │
   ▼
PostgreSQL
   │
   ▼
Persistent Data
```

Because the data is stored in PostgreSQL, restarting the Node.js server does not remove the stored records.

##  Security

Sensitive configuration is kept out of version control.

The following are excluded using `.gitignore`:

```text
.env
node_modules/
```

This prevents database credentials and installed dependencies from being uploaded to GitHub.

##  Key Learning Outcomes

This project provided practical experience with:

- Building REST APIs using Express.js
- Connecting Node.js applications to PostgreSQL
- Using Prisma ORM
- Defining database models
- Creating and applying database migrations
- Implementing CRUD operations
- Request validation
- Error handling
- Persistent database storage
- Environment variable management
- Git and GitHub version control

##  Author

**Vikas Yadav**

DecodeLabs Internship

GitHub: https://github.com/vikas-g-10

##  Repository

The DecodeLabs internship repository contains both projects:

```text
DecodeLab-intern/
├── Project-1/
└── Project-2/
```
