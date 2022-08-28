exports.appResponse = (res, status, message)=>{
    const object = {
        status: status,  
        message: message,
    }
    if(res.locals.refreshToken){
        Object.assign(object , {refreshtoken:res.locals.refreshToken})
    }
    return res.status(status).json({
       ...object
     });
}



