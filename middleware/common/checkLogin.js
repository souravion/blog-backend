const jwt = require('jsonwebtoken');
const { verifyRefreshToken } = require('../../helpers/verifyRefreshToken.helpers');
const token = ('../../utils/verifyRefreshToken.js')
const jwt_decode = require('jwt-decode') 
const checkLogin =  (req,res, next)=>{
    const  { refreshtoken } = req.headers
    jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_PRIVATE_KEY,(error,token)=>{
        if(!error){
            const {_id} = token
            req.userId = _id
            res.locals = {userId:_id}
            next()
        }else if(error && error.message == 'jwt expired'){
            const decoded = jwt_decode(refreshtoken)
            verifyRefreshToken(req,res,next, decoded.userId)
        }else{
                res.status(401).json({
                "status":401,
                "error":"Authentication failed "
            })
        }
    })
}

module.exports=checkLogin

