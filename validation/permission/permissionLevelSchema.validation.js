const Joi = require('joi');
exports.AddPermissionLevel = Joi.object({
    name:Joi.string().required(),
    parentId:Joi.string().required()
})