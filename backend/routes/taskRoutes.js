// routes/taskRoutes.js

const express = require('express');
const router = express.Router();
const Task = require('../model/Task');

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new task
router.post('/', async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get page number from query params, default to 1
    const limit = parseInt(req.query.limit) || 10; // Get limit from query params, default to 10

    try {
        const tasks = await Task.find()
            .skip((page - 1) * limit) // Skip tasks based on page number and limit
            .limit(limit); // Limit number of tasks per page

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
