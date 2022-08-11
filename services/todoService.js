const todoSchema = require('../models/todosSchema')
const mongoose = require("mongoose")
const Todo = new mongoose.model('Todo',todoSchema)

exports.list = async ()=> {
    try {
        const todoList = await Todo.find({status:'active'})
        return todoList;
    } catch (e) {
        throw Error('Something went worng')
    }
}
