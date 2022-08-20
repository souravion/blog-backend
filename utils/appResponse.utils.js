exports.appResponse = (res, status, message)=>{
    return res.status(status).json({
        status: status,  
        message: message
     });
}



