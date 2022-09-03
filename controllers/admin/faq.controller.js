const faqService = require("../../services/faq.service")
const { faqSchema ,editFaqSchema , statusChangeFaqSchema } = require("../../validation/faq.validation")
const MESSAGE = require('../../utils/errorMessges.utils')
const { appResponse } = require("../../utils/appResponse.utils");

exports.AddFaqController = async(req, res, next)=>{
    try{
        const postParam={
            title:req.body.title,
            description:req.body.desc
        }

        const result = await faqSchema.validateAsync(postParam);
        const doExsit = await faqService.findFaq(result.title)

        if(!doExsit){
            faqService.addfaq({...result,createdby:res.locals.userId,}).then(()=>{
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

        faqService.UpdateFaq(id, {...validationResult , createdby: res.locals.userId}).then((result)=>{
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

exports.ChangeFaqStatusController = async (req, res , next)=>{
    try{
        const id = req.params.id
        postparams = {
            is_active:req.body.status
        }
        const validationResult = await statusChangeFaqSchema.validateAsync(postparams)
        console.log(validationResult)
        if(validationResult){
            faqService.ChangeStatus(id, validationResult).then((result)=>{
                if(result){
                    return appResponse(res, 200, MESSAGE.UPDATED)
                }else{
                    return appResponse(res, 404, MESSAGE.NOTEXISTS)
                }
            }).catch((error)=>{
                next(error)
            })
        }
    }catch(error){
        next(error)
    }
}

exports.FindFaqByIdController = async(req, res, next)=>{
    try{
        const id = req.params.id

        const categoryResult = await faqService.FindFaqById(id)
        if(categoryResult){
            res.json({
                status:200,
                message:'Fetch sucessfully!',
                data:categoryResult
            })
        }else{
            return  appResponse(res, 403, MESSAGE.NOTFOUND)
        }
    }catch(error){
        next(error)
    }
}

exports.RemoveFaqByIdController = async (req, res, next)=>{
    try{
        const id = req.params.id
        faqService.RemoveFaqById(id).then((result)=>{
            if(result){
                return appResponse(res, 200, MESSAGE.DELETED)
            }else{
                return appResponse(res, 200, MESSAGE.NOTEXISTS)
            }
        }).catch((error)=>{
            next(error)
        })
        
    }catch(error){
       next(error)
    }
}