
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
        const {page =2 , limit=10} = req.query
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
  
      const results = {}
     
    if (endIndex <  await AdminUser.countDocuments().exec()) {
        results.next = {
          page: page + 1,
          limit: limit
        }
       
      }
      
      if (startIndex > 0) {
    
        results.previous = {
          page: page - 1,
          limit: limit
        }
       
      }
      try {
        // results.results = await AdminUser.find().limit(limit).skip(startIndex).exec()
        results.results = await AdminUser.aggregate([
                    {
                        $lookup:
                        {
                            from: 'adminusers',
                            localField: '_id',
                            foreignField:'createdby',
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
                ]).limit(limit).skip(startIndex).exec()

        return results
      } catch (e) {
        res.status(500).json({ message: e.message })
      }
    
    }
    catch(error){
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)
    }
}