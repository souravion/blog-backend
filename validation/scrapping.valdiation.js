const Joi = require('joi');
// exports.scrappingSchema = Joi.object({
//     title:Joi.string().required(),
//     description:Joi.string().required(),
//     blog_url:Joi.string().required(),
//     img:Joi.string().optional(),
//     published_date:Joi.string().optional(),
//     cat_id:Joi.string().required(),

// })


exports.scrappingSchema = Joi.object({
    name:Joi.string().required(),
    image:Joi.string().required(),
})
