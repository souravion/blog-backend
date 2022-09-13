

const adminService = require('../../services/admin.service')
const addAdminService = require('../../services/addAdmin.service')
const bcrypt = require('bcrypt');

const  MESSAGE  = require('../../utils/errorMessges.utils');
const { appResponse } = require('../../utils/appResponse.utils');
const createError = require('http-errors')
const { AddAdminschema } = require('../../validation/AddAdminSchema.validation')
/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @param {passed to the middleware function} next 
 * @returns 
 */

 exports.AddAdminController = async (req, res, next) => {

    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        const postParams = {
                    name:req.body.name,
                    email:req.body.email,
                    password:hashedPassword,
                    description:req.body.description
                }
        const result = await AddAdminschema.validateAsync(postParams)
        const doesExist = await adminService.FindUser(result.email)
        if (doesExist){
           throw createError.Conflict(`${result.email} is already been registered`)
            
        }else{
            addAdminService.AddAdmin({...postParams,createdby:res.locals.userId}).then(()=>{
                return appResponse(res, 200, MESSAGE.USER_CREATED)
            }).catch((error)=>{
                next(error)
            })
        }
        
    }catch(error){
        if(error.isJoi === true){
        error.status = 422
        next(error)
        }
        next(error)  
    }

}