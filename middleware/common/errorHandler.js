

exports.defaultErrorHandler = (err, req, res, next)=>{
     let errorParams = {
        status:err.statusCode || 500,
        code:err.errorCode,
        message: err.message,
     }

    if(process.env.NODE_ENV === 'dev'){
        Object.assign(errorParams,{stack: err.stack}) 
    }
    res.status(err.statusCode || 500).json({
        ...errorParams
      })


}


