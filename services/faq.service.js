const Faq = require("../models/faq.model")
const { AppError,ERROR,ERRORCODE } = require("../utils/appError.utils")
const MESSAGE = require('../utils/errorMessges.utils')

exports.addfaq = async(req, res)=>{
    try{
        const addfaq = new Faq(req)
        const faqCreated = await addfaq.save()
        return faqCreated
    }catch{
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)
    }
}

exports.findFaq = async(req, res)=>{
    try{
        const result = await Faq.findOne({title:req})
        return result;
    }catch(error){
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)
    }
}