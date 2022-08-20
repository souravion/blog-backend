
const adminService = require('../../services/admin.service')
const bcrypt = require('bcrypt');
const { generateTokens } = require("../../utils/generateTokens.utils");
const { createCookies } = require("../../utils/createCookies.utils");
const {sendMessage } = require("../../utils/sendMessage.utils");
const  MESSAGE  = require('../../utils/errorMessges.utils');

exports.CreateAdminUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.passsword,10)
        const postParams = {
            name:req.body.name,
            passsword:hashedPassword,
            email:req.body.email,
            mobile_number:req.body.mobile_number,
            created_by:req.body.created_by,
            is_active:req.body.is_active
        }
        await adminService.UserCreate(postParams)
        return sendMessage(res, 200, MESSAGE.USER_CREATED)
    } catch (e) {
        return sendMessage(res, 400, e.message)
    }
}

// below controller for login 

exports.LoginController = async (req, res) => {
    try {
        const user = await adminService.Login(req.body.email)
        if(user && Object.keys(user).length > 0){
            const isValidPassword = await bcrypt.compare(req.body.password, user.passsword)
            if(isValidPassword){
                // Generate token
                const payload = {
                    name:user.name,
                    userId:user._id
                }
                // after nenerateToken
                const tokens = await generateTokens(payload);
                // here we just send token and res to createCookies function as a parameters 
                await createCookies(tokens,res)

                return sendMessage(res, 200, MESSAGE.USER_CREATED)
            }else{
                return sendMessage(res, 401, MESSAGE.AUTHENTICATIION)
            }
            
        }else{
            return sendMessage(res, 401, MESSAGE.AUTHENTICATIION)
        }

    } catch (e) {
        return sendMessage(res, 401, MESSAGE.AUTHENTICATIION)
    }
}

exports.CategoryController = async(req, res)=>{
    res.send("Category Created")
}