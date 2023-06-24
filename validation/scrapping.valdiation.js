const Joi = require('joi');
exports.scrappingContentSchema = Joi.object({
    title:Joi.string().required(),
    description:Joi.string().required(),
    blogUrl:Joi.string().required(),
    blogBanner:Joi.string().required(),
    publishedDate:Joi.string().optional(),
    categoryID:Joi.string().required(),

})


exports.scrappingAuthorSchema = Joi.object({
    name:Joi.string().required(),
    image:Joi.string().optional(),
})
