const addFaqService = require("../../services/faq.service")
const { faqSchema } = require("../../validation/faq.validation")
const MESSAGE = require('../../utils/errorMessges.utils')
const { appResponse } = require("../../utils/appResponse.utils");

exports.addFaqController = async(req, res, next)=>{
    try{
        const postParam={
            title:req.body.title,
            description:req.body.desc
        }

        const result = await faqSchema.validateAsync(postParam);
        const doExsit = await addFaqService.findFaq(result.title)

        console.log(result)
        if(!doExsit){
            addFaqService.addfaq({...result,createdby:res.locals.userId,}).then(()=>{
                return appResponse(res, 200, MESSAGE.CREATED)
            }).catch((error)=>{
                next(error)
            })
        }else{
            const errorMessage  =`${ result.title} ${MESSAGE.EXISTS}`
            return  appResponse(res, 403, errorMessage)
        }
    }catch(error){
        next(error)
    }
}