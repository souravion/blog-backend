const addFaqService = require("../../services/faq.service")
const { faqSchema ,editFaqSchema } = require("../../validation/faq.validation")
const MESSAGE = require('../../utils/errorMessges.utils')
const { appResponse } = require("../../utils/appResponse.utils");

exports.AddFaqController = async(req, res, next)=>{
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

exports.UpdateFaqsController = async(req, res , next)=>{
    try{    
        const id = req.params.id
        postparams = {
            title:req.body.title,
            description:req.body.desc,
            is_active:req.body.status
        }

        const validationResult = await editFaqSchema.validateAsync(postparams)

        addFaqService.UpdateFaq(id, {...validationResult , createdby: res.locals.userId}).then((result)=>{
            if(result){
                return appResponse(res, 200, MESSAGE.UPDATED)
            }else{
                return appResponse(res, 404, MESSAGE.NOTEXISTS)
            }
        }).catch((error)=>{
            next(error)
        })
    }catch{
        next(error)
    }
}

exports.GetFaqsController = async(req, res, next)=>{
    try{
        const faqs = await addFaqService.GetFaqs()
        console.log(faqs)
        if(faqs.length){
            res.send(faqs)
        }else{
            return  appResponse(res, 404, MESSAGE.NOTFOUND)
        }
    }catch(error){
        next(error)
    }
}