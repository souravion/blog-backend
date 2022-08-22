const { urlSchema } = require("../../validation/url.validation")

const axios = require("axios");
const cheerio = require("cheerio");
blogDetails = []

exports.ScrappingController = async (req, res, next)=>{
    try{
        const postparam = {
            url:req.body.url
        }
        const validationResult= await urlSchema.validateAsync(postparam)
        
        if(validationResult){
            const { data } = await axios.get(validationResult.url,{xmlMode: true});
            const $ = cheerio.load(data);
            const title = $("head title").text();
            const description = $('meta[property="og:description"]').attr('content');
            const blogUrl = $('meta[property="og:url"]').attr('content');
            const eachBlogContent = { title: "", description: "", blogUrl:""};
    
            eachBlogContent.title = title
            eachBlogContent.description = description
            eachBlogContent.blogUrl = blogUrl
            blogDetails.push(eachBlogContent)

            res.json(eachBlogContent)
        }
    }catch(error){
        next(error)
    }
}