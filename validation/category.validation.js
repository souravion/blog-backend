const Joi = require('joi');
exports.AddCategoryschema = Joi.object({
    name:Joi.string().required(),
    image:Joi.string().required(),
    
})

exports.EditCateogrySchema = Joi.object({
    name:Joi.string().required(),
    image:Joi.string().required(),
    meta_title:Joi.string().required(),
    slug:Joi.string().required(),
    is_active:Joi.string().required(),
    isVerified:Joi.boolean().required()
})