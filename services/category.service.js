const Category = require("../models/category.model")
const { AppError } = require("../utils/appError.utils")


exports.AddCategory = async (req,res, next)=>{
    try{
        const category = new Category(req)
        const createdCategory = await category.save()
        return createdCategory
    }catch(error){
        next(error)
    }
}

exports.FindCategory = async(req,res)=>{
    try{
        const user = await Category.findOne({name:req})
        return user;
    }catch(error) { 
        next(error)
    }

}