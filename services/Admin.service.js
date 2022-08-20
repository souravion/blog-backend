
const {UserCreateSchema} = require('../models/AdminSchema.model')
const mongoose = require("mongoose")
const AddAdminUser = require('../models/AddAdminUserSchema.model')
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
        const user = await adminUser.findOne({email:req})
        return user;
    }catch {
        throw Error('Authentication failed')
    }

}

exports.AdminUserCreate = async (req,res)=> {
    try {
        const adminUserCreated = new AddAdminUser(req)
        const newAdminUserCreated = await adminUserCreated.save()
        return newAdminUserCreated;
    } catch (e) {
        throw Error('There was an server side error')
    }
}

exports.FindUser = async(req,res)=>{
    try{
        const user = await AddAdminUser.findOne({email:req})
        return user;
    }catch {
        throw Error('Authentication failed')
    }

}
