
const {UserCreateSchema} = require('../models/AdminSchema')
const mongoose = require("mongoose")
const adminUser = new mongoose.model('user',UserCreateSchema)

exports.UserCreate = async (req,res)=> {
    try {
        const newUserCreate = new adminUser(req)
        const UserCreated = await newUserCreate.save()
        return UserCreated;
    } catch (e) {
        throw Error('There was an server side error')
    }
}

exports.Login = async(req,res)=>{
    try{
        const user = await adminUser.find({email:req})
        return user;
    }catch{
        throw Error('Authentication failed')
    }

}
