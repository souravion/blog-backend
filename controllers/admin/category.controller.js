const { AddCategoryschema } = require("../../validation/addCategory.validation")
const categoryService = require('../../services/category.service')
const MESSAGE = require('../../utils/errorMessges.utils')
const { appResponse } = require("../../utils/appResponse.utils");

exports.CategoryController = async (req,res,next)=>{
    try{
        let slug = ''
        const postParams = {
            name:req.body.name,
            image:req.body.image,
        }
        slug  = req.body.name.split(" ")
        
        if(slug.length>1){
            slug = slug.join("-").toLowerCase()
        }else{
            slug = slug.toString().toLowerCase()
        }

        const result = await AddCategoryschema.validateAsync(postParams)
        const doExsit = await categoryService.FindCategory(result.name)
        if(!doExsit){
            categoryService.AddCategory({...result, createdby:res.locals.userId, slug:slug}).then((result)=>{
                return appResponse(res, 200, MESSAGE.CREATED)
            }).catch((error)=>{
               next(error)
            })
        }else{
            const errorMessage  =`${ result.name} ${MESSAGE.EXISTS}`
            return  appResponse(res, 403, errorMessage)
        }
    }catch(error){
        if(error.isJoi===true){
            next(error)
        }else{
            next(error)
        }
    }
}

exports.GetCategoryController= async(req, res)=>{
    try{
        const getCategories = await categoryService.GetCategories()
        if(getCategories){
            res.send(getCategories)
        }else {
            return  appResponse(res, 403, MESSAGE.NOTFOUND)
        }
    }catch(error){
        next(error)
    }
}


