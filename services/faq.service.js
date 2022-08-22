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

exports.UpdateFaq = async (id, req, res)=>{
    try{
        const updatedCategory =  await Faq.findByIdAndUpdate(id, req)
        return updatedCategory
    }catch{
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)

    }
}

exports.GetFaqs = async(req, res)=>{
    try{

        const getFaqs = await Faq.find({}).select({
            _id:0,
            __v:0,
            createdby:0,
            createdAt:0  
        })
        return getFaqs
    }catch{
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)
    }
}

exports.ChangeStatus = async(id,req,res)=>{
    try{
        const ChangedStatus = await Faq.findByIdAndUpdate(id,req);
        return ChangedStatus
    }
    catch(error){
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)
    }
}


exports.FindFaqById = async(req,res)=>{
    try{
        const faq = await Faq.findOne({_id:req}).select({
            __v:0,
            createdby:0,
            createdAt:0  
          })
        return faq;
    }catch(error) { 
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)
    }
}

exports.RemoveFaqById = async(req, res)=>{
    try{
        const removefaq = await Faq.findByIdAndDelete({_id:req})
        return removefaq
    }catch{
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)
    }

}