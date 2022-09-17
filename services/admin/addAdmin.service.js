
const AdminUser = require('../../models/adminUser.model')
const { AppError,ERROR,ERRORCODE } = require("../../utils/appError.utils")
const MESSAGE = require('../../utils/errorMessges.utils')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
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
  console.log( req.query)
    try{
      let  page =1
      let  limit=10
      page = parseInt(req.query.page)
      limit = parseInt(req.query.limit)
        const {} = req.query
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
  
      const results = {}
      results.current ={
        page: page,
        limit: limit
      }
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
        results.results = await AdminUser.aggregate([
          { 
            "$lookup": {
            "from": "adminusers",
            "localField": "createdby",
            "foreignField": "_id",
            "as": "created"
          }
        },

          {$unwind:"$created"},
          {
            $project:
            {
                "__v":0,
                "createdby":0,
                "password":0,
                "created._id":0,
                "created.password":0,
                "created.email":0,
                "created.status":0,
                "created.date":0,
                "created.__v":0,
                "created.desc": 0,
                "created.permission": 0,
                "created.isEmailVarified": 0,
            },
      },
]).skip(startIndex).limit(limit).exec();

        return results
      } catch (e) {
        res.status(500).json({ message: e.message })
      }
    
    }
    catch(error){
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)
    }
}