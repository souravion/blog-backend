const jwt = require('jsonwebtoken');
const { verifyRefreshToken } = require('../../helpers/verifyRefreshToken.helpers');
const token = ('../../utils/verifyRefreshToken.js')

const checkLogin =  (req,res, next)=>{
    console.log(req.headers)
    const  { accesstoken , refreshtoken} = req.headers
    console.log(accesstoken)
    jwt.verify(accesstoken, process.env.ACCESS_TOKEN_PRIVATE_KEY,(error,token)=>{
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
            verifyRefreshToken(req,res,next,refreshtoken)
        }


    })
}

module.exports=checkLogin

