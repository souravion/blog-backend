const Joi = require('joi');
exports.AddAdminschema = Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().lowercase().required(),
    password:Joi.string().required(),
    desc:Joi.string().required()
})