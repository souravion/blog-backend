
const MESSAGE = require('../../../utils/errorMessges.utils')
const { appResponse } = require("../../../utils/appResponse.utils");
const permissionService = require('../../../services/admin/permission/permission.service');
const { AddPermissionLevel } = require('../../../validation/permission/permissionLevelSchema.validation');
const adminService = require('../../../services/admin/admin.service')

exports.AddPermissionLevelController = async (req,res,next)=>{
    try{
        const result = await AddPermissionLevel.validateAsync(req.body)
        const doExsit = await permissionService.FindPermissionLevelName(req.body.name)
        if(!doExsit){
            permissionService.AddPermissionLevel({...result, createdby:res.locals.userId}).then((result)=>{
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


exports.GetPermissionController= async(req, res,next)=>{
    try{
        
        const GetPermissions = await permissionService.GetPermission(req)
        if(GetPermissions.length){
            res.json({
                status:200,
                message:'Fetch sucessfully!',
                data:GetPermissions
            })
        }else {
            return  appResponse(res, 404, MESSAGE.NOTFOUND)
        }
    }catch(error){
        next(error)
    }
}


exports.SavePermissionController = async (req, res , next)=>{
    try{
        const id = req.params.id
        // const result = await AddPermissionLevel.validateAsync(req.body)
        const doExsit = await adminService.FindUserById(id)
        if(doExsit){
            permissionService.SavePermissions(id,req.body).then((result)=>{
                return appResponse(res, 200, MESSAGE.ASSIGNED)
            }).catch((error)=>{
               next(error)
            })
        }else{
            return  appResponse(res, 403, MESSAGE.NOTEXISTS)
        }
    }catch(error){
        if(error.isJoi===true){
            next(error)
        }else{
            next(error)
        }
    }
}




exports.UpdatePermissionLevelController = async(req, res , next)=>{
    try{    
        const id = req.params.id
        const validationResult = await AddPermissionLevel.validateAsync(req.body)

        permissionService.UpdatePermissionLevel(id, {...validationResult , createdby: res.locals.userId}).then((result)=>{
            if(result){
                return appResponse(res, 200, MESSAGE.UPDATED)
            }else{
                return appResponse(res, 404, MESSAGE.NOTEXISTS)
            }
        }).catch((error)=>{
            next(error)
        })
    }catch(error){
        next(error)
    }
}

