const Joi = require('joi');
exports.scrappingSchema = Joi.object({
    title:Joi.string().required(),
    description:Joi.string().required(),
    blogUrl:Joi.string().required(),
    imageUrl:Joi.string().uri().optional(),
    authorImage:Joi.string().uri().optional(),
    authorname:Joi.string().optional(),
    publishedDate:Joi.string().optional(),
    category:Joi.string().required(),
    postUrl:Joi.string().uri().optional()

})
