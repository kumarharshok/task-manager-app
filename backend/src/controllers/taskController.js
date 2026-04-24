const Task = require('../models/Task');

const createTask = async (req, res) => {
    const { title, description } = req.body;

    try {
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const task = await Task.create({
            title,
            description,
            userId: req.user.id
        });

        res.status(201).json({
            message: "Task created",
            task
        });

    } catch (error) {
        res.status(500).json({ message: "Error creating task" });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            where: { userId: req.user.id }
        });

        res.status(200).json({
            tasks
        });

    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks" });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const task = await Task.findOne({
            where: { id, userId: req.user.id }
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (status) {
            task.status = status;
        } else {
            task.status = task.status === "pending" ? "completed" : "pending";
        }

        await task.save();

        res.status(200).json({
            message: "Task updated",
            task
        });

    } catch (error) {
        res.status(500).json({ message: "Error updating task" });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findOne({
            where: { id, userId: req.user.id }
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        await task.destroy();

        res.status(200).json({
            message: "Task deleted"
        });

    } catch (error) {
        res.status(500).json({ message: "Error deleting task" });
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};