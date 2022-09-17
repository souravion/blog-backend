const AdminModel = require('../../models/adminUser.model')
const { AppError,ERROR,ERRORCODE } = require("../../utils/appError.utils")
const MESSAGE = require('../../utils/errorMessges.utils')
exports.search = async(result,req, res)=>{
    try{
        const searchResult = await AdminModel.find( { searchKeyWord: { $in: result } } ).select({
            "name":1
        })
        return searchResult
    }catch{
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)
    }
   
}