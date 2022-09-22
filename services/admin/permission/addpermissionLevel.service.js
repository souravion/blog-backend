const PermissionLevel = require("../../../models/permission/addPermissionLevel.model")
const { AppError,ERROR,ERRORCODE } = require("../../../utils/appError.utils")
const MESSAGE = require('../../../utils/errorMessges.utils')
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
    console.log(req)
    try{

        const addPermissionLevel = new PermissionLevel(req)
        const createAddPermissionLevel = await addPermissionLevel.save()
        return createAddPermissionLevel
    }catch(error){
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)
    }
}