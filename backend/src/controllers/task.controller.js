const Task = require('../models/Task');

async function getAllTasks(req, res) {
    try {
        const tasks = await Task.findAll({
            order: [['updatedAt', 'DESC']]
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createTask(req, res) {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function updateTask(req, res) {
    try {
        const { id } = req.params;
        await Task.update(req.body, { where: { id } });
        const task = await Task.findByPk(id);
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deleteTask(req, res) {
    try {
        const { id } = req.params;
        await Task.destroy({ where: { id } });
        res.status(200).json({ message: 'successfully deleted the task' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    deleteTask: deleteTask,
    getAllTasks: getAllTasks,
    updateTask: updateTask,
    createTask: createTask
}
