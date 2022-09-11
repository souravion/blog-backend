const Joi = require('joi');
exports.AddCategoryschema = Joi.object({
    name:Joi.string().required(),
    color:Joi.string().required(),
    backgroundcolor:Joi.string().required(),
    image:Joi.string().required()
    
})

exports.EditCateogrySchema = Joi.object({
    name:Joi.string().required(),
    color:Joi.string().required(),
    backgroundcolor:Joi.string().required(),
    image:Joi.string().required(),
    slug:Joi.string().required(),
    status:Joi.string().required()
})