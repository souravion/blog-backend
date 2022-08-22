
const AdminUser = require('../models/adminUser.model')
const UserToken = require('../models/userToken.model')
const { AppError,ERROR,ERRORCODE } = require("../utils/appError.utils")
const MESSAGE = require('../utils/errorMessges.utils')

// exports.UserCreate = async (req,res)=> {
//     try {
//         const newUserCreate = new adminUser(req)
//         const UserCreated = await newUserCreate.save()
//         return UserCreated;
//     } catch (e) {
//         throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)
//     }
// }

exports.AdminUserCreate = async (req,res)=> {
    try {
        const adminUserCreated = new AdminUser(req)
        const newAdminUserCreated = await adminUserCreated.save()
        return newAdminUserCreated;
    } catch (e) {
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)

    }
}


exports.AdminLogin = async(req,res)=>{
    try{
        const user = await AdminUser.findOne({email:req})
        return user;
    }catch {
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)

    }

}



exports.FindUser = async(req,res)=>{
    try{
        const user = await AdminUser.findOne({email:req})
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

