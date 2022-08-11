const express = require('express');
const {getAllTodo} = require('../controllers/todoController');

const router = express.Router();

router.get('/', getAllTodo);

module.exports = router;

