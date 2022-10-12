
const AdminUser = require('../../models/adminUser.model')
const UserToken = require('../../models/userToken.model')
const { AppError,ERROR,ERRORCODE } = require("../../utils/appError.utils")
const MESSAGE = require('../../utils/errorMessges.utils')





exports.AdminLogin = async(req,res)=>{
    try{
        const user = await AdminUser.findOne({email:req})
        return user;
    }catch {
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)

    }

}

exports.AdminTokenVerify = async(req,res)=>{
    try{
        const user = await UserToken.findOne({token:req})
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

exports.FindUserById = async(req,res)=>{
    try{
        const userInfo = await AdminUser.findOne({_id:req}).select({
            __v:0,
            createdby:0,
            createdAt:0,
            password:0,
            searchKeyWord:0  
          })
        return userInfo;
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

