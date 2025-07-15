const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');
const router = express.Router();
const { connectDB } = require('../config/mongo');
const authenticate = require('../middleware/auth');

let db;
(async () => {
  db = await connectDB();
})();

router.get('/todos', authenticate, async (req, res) => {
    try {
        const todos = db.collection('todos');
        const userTodos = await todos.find({ username: req.user.username }).toArray();
        res.json(userTodos);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching todos' });
    }
});

router.post('/todos', authenticate, async (req, res) => {
    try {
        const { title, completed = false } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const todos = db.collection('todos');
        const newTodo = {
            title,
            completed,
            username: req.user.username,
            createdAt: new Date()
        };

        const result = await todos.insertOne(newTodo);
        res.status(201).json({ ...newTodo, _id: result.insertedId });
    } catch (err) {
        res.status(500).json({ message: 'Error creating todo' });
    }
});

router.put('/todos/:id', authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;

        const todos = db.collection('todos');

        const updateFields = {};
        if (title !== undefined) updateFields.title = title;
        if (completed !== undefined) updateFields.completed = completed;

        const result = await todos.findOneAndUpdate(
            { _id: new ObjectId(id), username: req.user.username },
            { $set: updateFields },
            { returnDocument: 'after' }
        );

        if (!result.title) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error updating todo' });
    }
});

router.delete('/todos/:id', authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const todos = db.collection('todos');
        const result = await todos.findOneAndDelete({
            _id: new ObjectId(id),
            username: req.user.username
        });

        if (!result.title) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting todo' });
    }
});

router.get('/todos/:id', authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const todos = db.collection('todos');
        const todo = await todos.findOne({
            _id: new ObjectId(id),
            username: req.user.username
        });

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching todo' });
    }
});

module.exports = router;