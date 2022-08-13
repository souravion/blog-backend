const jwt = require('jsonwebtoken');

const checkLogin= (req,res, next)=>{
    try{
        const  { authorization } = req.headers
        const token= authorization
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const { name , userId } = decoded
        req.name = name
        req.userId = userId
        next()
        
    }catch{
        next('Authorization failure')
    }
}

module.exports=checkLogin

