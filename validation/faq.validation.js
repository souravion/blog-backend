const Joi = require('joi');
exports.faqSchema = Joi.object({
    title:Joi.string().min(3).max(30).required(),
    description:Joi.string().min(3).max(200).required(),
    
})
