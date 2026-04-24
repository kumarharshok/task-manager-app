const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const taskController = require('../controllers/taskController');

router.post('/tasks', auth, taskController.createTask);
router.get('/tasks', auth, taskController.getTasks);
router.put('/tasks/:id', auth, taskController.updateTask);
router.delete('/tasks/:id', auth, taskController.deleteTask);

module.exports = router;