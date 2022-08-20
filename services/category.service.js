const Category = require("../models/category.model")
const { AppError } = require("../utils/appError.utils")

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.AddCategory = async (req,res, next)=>{
    try{
        const category = new Category(req)
        const createdCategory = await category.save()
        return createdCategory
    }catch(error){
        next(error)
    }
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.GetCategories = async (req, res)=>{
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
        next(error)
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
        const user = await Category.findOne({name:req})
        return user;
    }catch(error) { 
        next(error)
    }

}