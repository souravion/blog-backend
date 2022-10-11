const PermissionLevel = require("../../../models/permission/addPermissionLevel.model")
const { AppError,ERROR,ERRORCODE } = require("../../../utils/appError.utils")
const MESSAGE = require('../../../utils/errorMessges.utils')
const AdminUser = require('../../../models/adminUser.model')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.FindPermissionLevelName = async(req,res)=>{
    try{
        const PermissionLevelName = await PermissionLevel.findOne({name:req})
        return PermissionLevelName;
    }catch(error) { 
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.AddPermissionLevel = async(req,res)=>{
    try{

        const addPermissionLevel = new PermissionLevel(req)
        const createAddPermissionLevel = await addPermissionLevel.save()
        return createAddPermissionLevel
    }catch(error){
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)
    }
}

exports.GetPermission = async(req, res)=>{
    try{
        const {page= 1 , limit=10} = req.query
        const getPermission = await PermissionLevel.find({}).limit(limit*1).skip((page-1)*limit)
        return getPermission
    }
    catch(error){
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)
    }
}

exports.SavePermissions = async(id, req, res)=>{
    try{        
        const assignPermission = await AdminUser.updateOne(
            { "_id" : mongoose.Types.ObjectId(id) },
            { $set: { "permission" : req } },{multi: true});
        
        return assignPermission
    }catch(error){
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)
    }
}

exports.UpdateAdmin = async (id, req, res) => {
    try{
      const updated = await AdminUser.findByIdAndUpdate(id,req)
      return updated;
    }catch(error){
        throw new AppError(error.message,ERROR.InternalServerError,ERRORCODE.InternalServerError)
    }
  }