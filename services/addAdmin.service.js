
const AdminUser = require('../models/adminUser.model')
const { AppError,ERROR,ERRORCODE } = require("../utils/appError.utils")
const MESSAGE = require('../utils/errorMessges.utils')
exports.AddAdmin = async (req,res)=> {
    
    try {
        const adminUserCreated = new AdminUser(req)
        const newAdminUserCreated = await adminUserCreated.save()
        return newAdminUserCreated;
    } catch (e) {
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)

    }
}

exports.GetAdmin = async(req, res)=>{
    try{
        const {page= 1 , limit=10} = req.query
        const getAddmin = await AdminUser.aggregate([
                {
                    $lookup:
                    {
                        from: 'adminusers',
                        localField: 'createdby',
                        foreignField:'_id',
                        as: "created"
                    }
                },
                {
                    $unwind:"$created"
                },
                {
    
                    $project:
                    {
                        "__v":0,
                        "createdby":0,
                        "password":0,
                        // "created._id":0,
                        "created.password":0,
                        "created.email":0,
                        "created.is_active":0,
                        "created.date":0,
                        "created.__v":0,
                        "created.description":0
    
                    },
                },
          
            ]).limit(limit*1).skip((page-1)*limit)
        return getAddmin
    }
    catch(error){
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)
    }
}