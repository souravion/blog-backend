const Category = require("../../models/category.model")
const { AppError,ERROR,ERRORCODE } = require("../../utils/appError.utils")
const MESSAGE = require('../../utils/errorMessges.utils')

exports.GetUserCategories = async(req, res)=>{
    
    try{
        // "name": "Tessdtss1ssd2ds",
        // "color": "Tesdsst",
        // "backgroundcolor": "Test",
        // "image": "Test",
        // "slug": "tessdtss1ssd2ds",
        // "status": "Active"
        const getCategories = await Category.find({status:"Active"}).select({
          __v:0,
          createdby:0,
          createdAt:0 ,
          status:0,
          slug:0 
        })
        return getCategories
    }
    catch(error){
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)
    }
}