const Category = require("../models/category.model")
const { AppError,ERROR,ERRORCODE } = require("../utils/appError.utils")
const MESSAGE = require('../utils/errorMessges.utils')

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.AddCategory = async(req,res)=>{
    try{
        const category = new Category(req)
        const createdCategory = await category.save()
        return createdCategory
    }catch(error){
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)
    }
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.GetCategories = async(req, res)=>{
    try{
        const getCategories = await Category.find({}).select({
          _id:0,
          __v:0,
          createdby:0,
          createdAt:0  
        })
        return getCategories
    }
    catch(error){
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.FindCategory = async(req,res)=>{
    try{
        const category = await Category.findOne({name:req})
        return category;
    }catch(error) { 
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)
    }
}


exports.ChangeStatus = async(id,req,res)=>{
    try{
        const ChangedStatus = await Category.findByIdAndUpdate(id,req);
        return ChangedStatus
    }
    catch(error){
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)
    }
}