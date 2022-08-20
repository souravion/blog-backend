const Joi = require('joi');
exports.AddCategoryschema = Joi.object({
    name:Joi.string().required(),
    image:Joi.string().required(),
    
})