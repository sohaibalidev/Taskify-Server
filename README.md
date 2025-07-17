# Wrikos Server

This is the backend of **Wrikos**, a secure and lightweight personal todo manager. It provides RESTful APIs for user authentication and task management, built with Node.js, Express, and MongoDB.

---

## Features

- JWT-based authentication
- User registration and login
- Protected routes for task management
- CRUD operations for todos
- Secure password hashing with bcrypt
- CORS and cookie handling support

---

## Tech Stack

- Node.js
- Express.js
- MongoDB (MongoDB Atlas or local)
- JSON Web Token (JWT)
- bcryptjs

---

## Environment Variables

Create a `.env` file in the root of the server directory:

```
MONGO_URI = mongodb://localhost:27017/Wrikos
JWT_SECRET = your_secure_secret_here
FRONT_END_URL =
DB_NAME = 
NODE_ENV = 
```

---

## Running the Server

```bash
npm install
npm start
```

Server will run on `http://localhost:5000` (or the port you define in `.env`).

---

## API Endpoints

| Endpoint           | Method | Description                           |
|--------------------|--------|---------------------------------------|
| `/api/register`    | POST   | Register a new user                   |
| `/api/login`       | POST   | Login with username and password      |
| `/api/todos`       | GET    | Fetch todos (requires JWT)            |
| `/api/todos`       | POST   | Create a new todo                     |
| `/api/todos/:id`   | PUT    | Update a todo (title, completed)      |
| `/api/todos/:id`   | DELETE | Delete a todo                         |
| `/api/health`      | GET    | Health check for uptime monitoring    |

---
