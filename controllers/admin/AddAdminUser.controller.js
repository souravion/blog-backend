const adminService = require('../../services/Admin.service')
const { AddAdminschema } = require('../../validation/AddAdminSchema.validation')
const createError = require('http-errors')
const bcrypt = require('bcrypt');
const { generatePassword } = require('../../utils/passwordGenerator.utils');

exports.AddAdminUserController = async (req, res, next) => {

    try{
        const password = generatePassword()
        const hashedPassword = await bcrypt.hash(password,process.env.SALT_VALUE)
        const postParams = {
                    name:req.body.name,
                    email:req.body.email,
                    password:hashedPassword,
                }
        const result = await AddAdminschema.validateAsync(postParams)
        const doesExist = await adminService.FindUser(result.email)
        if (doesExist){
           throw createError.Conflict(`${result.email} is already been registered`)
            
        }else{
            adminService.AdminUserCreate({...postParams,created_by:res.locals.userId}).then((res)=>{
                return res.status(200).json({ 
                "status": 200,  
                "message": "User Succesfully Created" });
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