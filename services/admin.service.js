
const {UserCreateSchema} = require('../models/admin.model')
const mongoose = require("mongoose")
const AddAdminUser = require('../models/addAdminUser.model')
const UserToken = require('../models/userToken.model')
const adminUser = new mongoose.model('user',UserCreateSchema)
const { AppError,ERROR,ERRORCODE } = require("../utils/appError.utils")
const MESSAGE = require('../utils/errorMessges.utils')

exports.UserCreate = async (req,res)=> {
    try {
        const newUserCreate = new adminUser(req)
        const UserCreated = await newUserCreate.save()
        return UserCreated;
    } catch (e) {
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)
    }
}

exports.AdminLogin = async(req,res)=>{
    try{
        const user = await adminUser.findOne({email:req})
        return user;
    }catch {
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)

    }

}

exports.AdminUserCreate = async (req,res)=> {
    try {
        const adminUserCreated = new AddAdminUser(req)
        const newAdminUserCreated = await adminUserCreated.save()
        return newAdminUserCreated;
    } catch (e) {
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)

    }
}

exports.FindUser = async(req,res)=>{
    try{
        const user = await AddAdminUser.findOne({email:req})
        return user;
    }catch {
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)

    }

}


exports.FindAdminUser = async(req,res)=>{
    try{
        const user = await UserToken.findOne({token: req})
        return user;
    }catch {
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)

    }
}

