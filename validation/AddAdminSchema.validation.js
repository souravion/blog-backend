const Joi = require('joi');
exports.AddAdminschema = Joi.object({
    email:Joi.string().email().lowercase().required(),
    password:Joi.string().min(6).required(),
    name:Joi.string().required(),
    created_by:Joi.optional().allow()
})