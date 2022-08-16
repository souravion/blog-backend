const jwt = require('jsonwebtoken');
const { verifyRefreshToken } = require('../../utils/verifyRefreshToken');
const token = ('../../utils/verifyRefreshToken.js')

const checkLogin =  (req,res, next)=>{
    const  { access_token , refresh_token} = req.cookies
    jwt.verify(access_token, process.env.ACCESS_TOKEN_PRIVATE_KEY,(error,token)=>{
        if(!error){
            if(token){
                const {_id} = token
                req.userId = _id
                res.locals = {userId:_id}
                next()
            }else{
                res.status(401).json({
                    "status":401,
                    "error":"Authentication failed "
                })
            }
        }else{
            verifyRefreshToken(req,res,next,refresh_token)
        
        }


    })
}

module.exports=checkLogin

