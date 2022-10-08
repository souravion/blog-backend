const Joi = require('joi');
exports.AddAdminschema = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().lowercase().required(),
    password:Joi.string().required(),
    desc:Joi.string().required()
})


exports.EditAddAdminschema = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().lowercase().required(),
    permission:Joi.string().required(),
    desc:Joi.string().required(),
    image:Joi.string().required(),
})