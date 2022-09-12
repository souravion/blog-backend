const Joi = require('joi');
exports.faqSchema = Joi.object({
    title:Joi.string().min(3).max(30).required(),
    description:Joi.string().min(3).required(),
    
})

exports.editFaqSchema = Joi.object({
    title:Joi.string().min(3).max(30).required(),
    description:Joi.string().min(3).required(),
    is_active:Joi.boolean().required()
    
})

exports.statusChangeFaqSchema = Joi.object({
    is_active:Joi.boolean().required()    
})