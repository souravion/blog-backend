const { AddCategoryschema, EditCateogrySchema } = require("../../validation/category.validation")
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

exports.GetCategoryController= async(req, res,next)=>{
    try{
        const getCategories = await categoryService.GetCategories()
        if(getCategories.lenght){
            res.json(getCategories)
        }else {
            return  appResponse(res, 404, MESSAGE.NOTFOUND)
        }
    }catch(error){
        next(error)
    }
}

exports.ChangeCategoryStatusController = async(req, res, next)=>{
    try{
        const id = req.params.id
        postparams = {
            is_active:req.body.status 
        }
        const statusChanged = await categoryService.ChangeStatus(id, postparams)
        if(statusChanged){
            return  appResponse(res, 200, MESSAGE.UPDATED)
        }else{
            return  appResponse(res, 403, MESSAGE.NOTEXISTS)
        }
    }catch{
        next(error)
    }
}

exports.CategoryUpdateController = async(req, res, next)=>{
    try{
        let slug = ''
        const id = req.params.id;
        postparams={
            name:req.body.name,
            image:req.body.image,
            meta_title:req.body.metatitle,
            is_active:req.body.status,
            isVerified:req.body.verified
        }

        slug  = req.body.name.split(" ")

        if(slug.length>1){
            slug = slug.join("-").toLowerCase()
        }else{
            slug = slug.toString().toLowerCase()
        }

        const result = await EditCateogrySchema.validateAsync({...postparams, slug:slug})
        categoryService.UpdateCategory(id,{...result, createdby:res.locals.userId}).then((result)=>{
           if(result){
               return appResponse(res, 200, MESSAGE.UPDATED)
           }else{
                return appResponse(res, 404, MESSAGE.NOTEXISTS)
           }
        }).catch((error)=>{
            next(error)
        })

    }catch(error){
        if(error.isJoi===true){
            next(error)
        }else{
            next(error)
        }
    }
}

exports.FindCtegoryByIdController = async(req, res, next)=>{
    try{
        const id = req.params.id

        const categoryResult = await categoryService.FindCategoryById(id)
        if(categoryResult){
            res.json(categoryResult)
        }else{
            return  appResponse(res, 403, MESSAGE.NOTFOUND)
        }
    }catch(error){
        next(error)
    }
}


exports.RemoveCtegoryByIdController = async (req, res, next)=>{
    try{
        const id = req.params.id
        categoryService.RemoveCategoryById(id).then((result)=>{
            if(result){
                return appResponse(res, 200, MESSAGE.DELETED)
            }else{
                return appResponse(res, 200, MESSAGE.NOTEXISTS)
            }
        }).catch((error)=>{
            next(error)
        })
        
    }catch(error){
       next(error)
    }
}

