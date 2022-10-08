const Joi = require('joi');
exports.AddPermissionLevel = Joi.object({
    name:Joi.string().required(),
    parentId:Joi.required(),
    options:Joi.object().required()
})