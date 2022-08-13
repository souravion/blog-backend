
const {UserCreateSchema} = require('../models/AdminSchema')
const mongoose = require("mongoose")
const userCreate = new mongoose.model('user',UserCreateSchema)

exports.UserCreate = async (req,res)=> {
    console.log(req)
    try {
        const newUserCreate = new userCreate(req)
        const UserCreated = await newUserCreate.save()
        return UserCreated;
    } catch (e) {
        throw Error('Something went worng')
    }
}
