// this below function only responsible for verify refresh token
const UserToken = require("../models/userToken.model")
const { generateTokens } = require("./generateTokens.helpers")
const jwt = require("jsonwebtoken") 
// const { createCookies } = require("./createCookies.helpers")
// const { AppError, ERROR, ERRORCODE, } = require('../utils/appError.utils');
const adminService = require('../services/admin.service')
const { object } = require("joi")
exports.verifyRefreshToken =  async(req, res , next , _id)=>{
       try{
        UserToken.findOne({ userId: _id }, async (error, tokenDetails) => {   
            if(!error){
                if(tokenDetails){
                    const { token } = tokenDetails
                    const usertokenInfo = await adminService.AdminTokenVerify(token)  
                    const userinfo = await adminService.FindUserById(usertokenInfo.userId)
                    jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY, async (tokenError)=>{
                        if(!tokenError){
                            const payload = {
                                userId:userinfo._id,
                                name:userinfo.name,
                                email:userinfo.email,
                                image:''
                            }
                            const tokens = await generateTokens(payload);
                            Object.assign(res.locals , {refreshToken:tokens.refreshToken})
                            Object.assign(res.locals , {userId:userinfo._id})
                            
                            next()
                        }
                    })
                }else{
                    res.status(401).json({
                        "status":401,
                        "error":"Authentication failed "
                    })
                    // throw new AppError(MESSAGE.AUTHENTICATIION,ERROR.Unauthorized,ERRORCODE.AuthErrorCode)
                }
            }else{
                res.status(401).json({
                    "status":401,
                    "error":"Authentication failed "
                })
                // throw new AppError(MESSAGE.AUTHENTICATIION,ERROR.Unauthorized,ERRORCODE.AuthErrorCode)
            }
        });
       }catch(error){
        next(error)
    }
}