const { AddCategoryschema, EditCateogrySchema } = require("../../validation/category.validation")
const categoryService = require('../../services/category.service')
const MESSAGE = require('../../utils/errorMessges.utils')
const { appResponse } = require("../../utils/appResponse.utils");

exports.GetUserCategoryController= async(req, res,next)=>{
    try{
        const getCategories = await categoryService.GetUserCategories()
        
        if(getCategories.length){
            res.json({
                status:200,
                message:'Fetch sucessfully!',
                data:getCategories
            })
        }else {
            return  appResponse(res, 204, MESSAGE.NOTFOUND)
        }
    }catch(error){
        next(error)
    }
}