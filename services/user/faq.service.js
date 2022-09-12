const Faq = require("../../models/faq.model")
const { AppError,ERROR,ERRORCODE } = require("../../utils/appError.utils")
const MESSAGE = require('../../utils/errorMessges.utils')

exports.GetFaqs = async(req, res)=>{
    try{

        const getFaqs = await Faq.find({}).select({
            _id:0,
            __v:0,
            createdby:0,
            createdAt:0, 
            status:0,
            date:0
        })
        return getFaqs
    }catch{
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)
    }
}



