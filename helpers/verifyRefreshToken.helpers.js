// this below function only responsible for verify refresh token
const UserToken = require("../models/userToken.model")
const { generateTokens } = require("./generateTokens.helpers")
const jwt = require("jsonwebtoken") 
const { createCookies } = require("./createCookies.helpers")
exports.verifyRefreshToken =  async(req, res , next , refresh_token)=>{
       try{
        UserToken.findOne({ token: refresh_token }, (error, tokenDetails) => {            
            if(!error){
                if(tokenDetails){
                    const { token } = tokenDetails
                    jwt.verify(token, process.env.REFRESH_TOKEN_PRIVATE_KEY, async (tokenError)=>{
                        if(!tokenError){
                            const payload = {
                                userId:tokenDetails.userId 
                            }
                            const tokens = await generateTokens(payload);
                            createCookies(tokens,res).then(()=>{
                                next()
                            }).catch(()=>{
                                throw new AppError(MESSAGE.AUTHENTICATIION,ERROR.Unauthorized,ERRORCODE.AuthErrorCode)
                            })
                        }else{
                            throw new AppError(MESSAGE.AUTHENTICATIION,ERROR.Unauthorized,ERRORCODE.AuthErrorCode)
                        }
                    })
                }else{
                    throw new AppError(MESSAGE.AUTHENTICATIION,ERROR.Unauthorized,ERRORCODE.AuthErrorCode)
                }
            }else{
                throw new AppError(MESSAGE.AUTHENTICATIION,ERROR.Unauthorized,ERRORCODE.AuthErrorCode)
            }
        });
       }catch(error){
        next(error)
       }
}