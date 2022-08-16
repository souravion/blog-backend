// this below function only responsible for verify refresh token
const UserToken = require("../models/UserToken")
const { generateTokens } = require("./generateTokens")
const jwt = require("jsonwebtoken") 
const { createCookies } = require("./createCookies")
UserToken
exports.verifyRefreshToken =  async(req, res , next , refresh_token)=>{
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
                            await createCookies(tokens,res)
                            next()
                        }else{
                            res.status(401).json({
                                "status":401,
                                "error":"Authentication failed "
                            })
                        }
                    })
                }else{
                    res.status(401).json({
                        "status":401,
                        "error":"Authentication failed "
                    })
                }
            }else{
                res.status(401).json({
                    "status":401,
                    "error":"Authentication failed "
                })
            }
        });
}