const jwt = require('jsonwebtoken');
const token = ('../../utils/verifyRefreshToken.js')
const  UserToken = require('../../models/UserToken')
const { generateTokens } = require("../../utils/generateTokens");

const checkLogin =  (req,res, next)=>{
    const  { access_token ,refresh_token } = req.cookies
    jwt.verify(access_token, process.env.ACCESS_TOKEN_PRIVATE_KEY,(error,token)=>{
        if(token){
            next()
        }else{

            UserToken.findOne({ token: refresh_token }, (err, tokenDetails) => {
                
                jwt.verify(token, process.env.REFRESH_TOKEN_PRIVATE_KEY, async (err, token)=>{
                    console.log(tokenDetails)


                    const payload = {
                        name:'sourav',
                        userId:tokenDetails.userId

                        
                    }
                    const { accessToken ,  refreshToken} = await generateTokens(payload);
                    res.cookie(process.env.ACCESS_TOKEN_COOKIE_NAME,accessToken,{
                        httpOnly: true,
                        singed:true,
                        // maxAge: 60000
                        
                    })
    
                    res.cookie(process.env.REFRESH_TOKEN_COOKIE_NAME,refreshToken,{
                        httpOnly: true,
                        singed:true,
                        // maxAge: 60000
                    })
                    next()
                })
                
            });
            
        }

    })
}

module.exports=checkLogin

