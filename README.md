# Taskify - Personal Todo Manager

Taskify is a lightweight and secure todo app featuring local authentication, dark/light mode, and user-specific task management. Built with the MERN stack for simplicity and performance.

---

## Features

- Dark/Light mode toggle  
- Local authentication (username and password)  
- Add, edit, mark complete, and delete tasks  
- Each user has their own private task list  
- Minimal UI focused on usability  

---

## Tech Stack

**Frontend**  
- React.js  
- Tailwind CSS  

**Backend**  
- Node.js  
- Express.js  
- MongoDB  

---

## Getting Started

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:

```
MONGO_URI=mongodb://localhost:27017/taskify
JWT_SECRET=your_secure_secret_here
PORT=5000
```

Start the backend:

```bash
npm start
```

---

### Frontend Setup

```bash
cd client
npm install
npm start
```

The frontend will run on `http://localhost:3000` by default.

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

---

## Todo States

- **Pending**: Default state of newly created todos  
- **Completed**: Marked as finished  
- **Deleted**: Permanently removed  

---

## Folder Structure (Optional)

```
taskify/
├── client/           # React frontend
│   └── ...
├── server/           # Express backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── ...
└── README.md
```

---

## Future Enhancements

- Add due dates (without reminders)  
- Implement tagging system (e.g., #work, #personal)  
- Soft delete (trash bin with recovery option)  

---

## License

MIT License
