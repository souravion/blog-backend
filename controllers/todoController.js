const todoSchema = require('../models/todosSchema')
const mongoose = require("mongoose")
const todoService = require('../services/todoService')
const Todo = new mongoose.model('Todo',todoSchema)

exports.getAllTodo = async (req, res) => {
    try {
        const todoList = await todoService.list()
        return res.status(200).json({ 
            status: 200, 
            data: todoList, 
            message: "Succesfully Retrieved" });
    } catch (e) {
        return res.status(400).json({ 
            status: 400, 
            message: e.message 
        });
    }
}


