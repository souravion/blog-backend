
const adminService = require('../../services/admin.service')
const bcrypt = require('bcrypt');
const { generateTokens } = require("../../helpers/generateTokens.helpers");
const { createCookies } = require("../../helpers/createCookies.helpers");
const  MESSAGE  = require('../../utils/errorMessges.utils');
const { AppError, ERROR, ERRORCODE, } = require('../../utils/appError.utils');
const { appResponse } = require('../../utils/appResponse.utils');
/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @param {passed to the middleware function} next 
 * @returns 
 */
exports.CreateAdminUser = async (req, res, next) => {
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
        return appResponse(res,200, MESSAGE.USER_CREATED)
    } catch (e) {
        next(e)
}
}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @param {passed to the middleware function} next 
 * @returns 
 */
exports.AdminLoginController = async (req, res,next) => {
    try {
        const user = await adminService.AdminLogin(req.body.email)
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

                return appResponse(res,200, MESSAGE.USER_LOGGEDIN)
            }else{
                throw new AppError(MESSAGE.AUTHENTICATIION,ERROR.Unauthorized,ERRORCODE.AuthErrorCode)
            }
            
        }else{
            throw new AppError(MESSAGE.AUTHENTICATIION,ERROR.Unauthorized,ERRORCODE.AuthErrorCode)
        }

    } catch (error) {
        next(error)
    }
}

/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @param {passed to the middleware function} next 
 * @returns 
 */
exports.AdminLogoutController = async (req, res,next) => {
    const { refresh_token} = req.cookies
    try{
        const userToken = await adminService.FindAdminUser(refresh_token);

        if(!userToken){
            return appResponse(res,200, MESSAGE.USER_LOGGEDOUT)
        }else{
            await userToken.remove()
            res.clearCookie('access_token');
            res.clearCookie('refresh_token');
            return appResponse(res,200, MESSAGE.USER_LOGGEDOUT)
        }
    }catch(error){
        next(error)
    }
}



