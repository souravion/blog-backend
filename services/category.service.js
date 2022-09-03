const Category = require("../models/category.model")
const { AppError,ERROR,ERRORCODE } = require("../utils/appError.utils")
const MESSAGE = require('../utils/errorMessges.utils')
const AdminUser = require('../models/adminUser.model')
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


        const getCategories1 = await Category.aggregate([
            {
                $lookup:
                {
                    from: 'adminusers',
                    localField: 'createdby',
                    foreignField:'_id',
                    as: "created"
                }
            },
            {
                $unwind:"$created"
            },
            {
                $project:
                {
                    "_id":0,
                    "__v":0,
                    "createdby":0,
                    "createdAt":0,
                    "created._id":0,
                    "created.password":0,
                    "created.email":0,
                    "created.is_active":0,
                    "created.date":0,
                    "created.__v":0,
                }
            }
        ])
        
        // console.log(getCategories1)
        return getCategories1

        // console.log("getCategories1", getCategories1)
        // await Category.find({}).populate('').exec(function(err, documents){
        //     console.log(documents)
        //     // you will get drinks object in response 
        // })
        // const getCategories = await Category.find({}).select({
        //   _id:0,
        //   __v:0,
        //   createdby:0,
        //   createdAt:0  
        // })
        // return getCategories
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


exports.UpdateCategory = async (id, req, res) => {

    try{
        const updateCategory  = await Category.findOneAndUpdate(id,req)
        return updateCategory
    }catch{
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)
    }
}

exports.FindCategoryById = async(req,res)=>{
    try{
        const category = await Category.findOne({_id:req}).select({
            __v:0,
            createdby:0,
            createdAt:0  
          })
        return category;
    }catch(error) { 
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)
    }
}


exports.RemoveCategoryById = async(req, res)=>{
    try{
        const removeCategory = await Category.findByIdAndDelete({_id:req})
        return removeCategory
    }catch{
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)
    }

}