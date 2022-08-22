const Joi = require('joi');
exports.urlSchema = Joi.object({
    url:Joi.string().uri()
})