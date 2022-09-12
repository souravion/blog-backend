const faqService = require("../../services/user/faq.service")
const MESSAGE = require('../../utils/errorMessges.utils')
const { appResponse } = require("../../utils/appResponse.utils");

exports.GetUserFaqsController = async(req, res, next)=>{
    try{
        const faqs = await faqService.GetFaqs()
        if(faqs.length){
            res.json({
                status:200,
                message:'Fetch sucessfully!',
                data:faqs
            })
        }else{
            return  appResponse(res, 404, MESSAGE.NOTFOUND)
        }
    }catch(error){
        next(error)
    }
}

