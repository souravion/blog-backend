const jwt = require('jsonwebtoken');

const checkLogin = (req,res, next)=>{

    try{
        const  { token } = req.cookies
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const { name , userId } = decoded
        req.name = name
        req.userId = userId
        next()
        
    }catch(error){
        res.status(401).json({
            "status":401,
            "error":'Authentication failed'
            })
    }
}

module.exports=checkLogin

