const Joi = require('joi');
exports.AddCategoryschema = Joi.object({
    name:Joi.string().required(),
    color:Joi.string().required(),
    backgroundcolor:Joi.string().required(),
    image:Joi.string().optional()
    
})

exports.EditCateogrySchema = Joi.object({
    name:Joi.string().required(),
    color:Joi.string().required(),
    backgroundcolor:Joi.string().required(),
    image:Joi.string().required(),
    slug:Joi.string().required(),
    is_active:Joi.string().required(),
    isVerified:Joi.boolean().required()
})