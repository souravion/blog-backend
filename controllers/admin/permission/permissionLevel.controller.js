

// const { AddCategoryschema, EditCateogrySchema } = require("../../validation/category.validation")
// const categoryService = require('../../services/admin/category.service')
const MESSAGE = require('../../../utils/errorMessges.utils')
const { appResponse } = require("../../../utils/appResponse.utils");
const findPermissionLevelNameService = require('../../../services/admin/permission/addpermissionLevel.service');
const { AddPermissionLevel } = require('../../../validation/permission/permissionLevelSchema.validation');

exports.AddPermissionLevelController = async (req,res,next)=>{
    try{
        console.log(req.body)
        const result = await AddPermissionLevel.validateAsync(req.body)
        const doExsit = await findPermissionLevelNameService.FindPermissionLevelName(req.body.name)
        if(!doExsit){
            findPermissionLevelNameService.AddPermissionLevel({...result, createdby:res.locals.userId}).then((result)=>{
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
