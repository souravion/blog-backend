// 404 not found
const createError = require('http-errors')
function notFoundHandler(req, res , next){
    const error = new Error ('Your requested route not found')
    error.status = 404
    next(error);
 
   
}
//default error error handler
function defaultErrorHandler(err,req,res,next){
    
    console.log(err)
    res.status(err.status || 500)
    res.send({
        error:{
            status:err.status || 500,
            message:err.message
        }
    })

}
module.exports = {
    notFoundHandler,
    defaultErrorHandler
}
