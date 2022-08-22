const { urlSchema } = require("../../validation/url.validation")

const axios = require("axios");
const cheerio = require("cheerio");
// const probe = require('probe-image-size');

exports.ScrappingController = async (req, res, next)=>{
    let blogDetails = []
    let images = []
    try{
        const postparam = {
            url:req.body.url
        }
        const validationResult= await urlSchema.validateAsync(postparam)
        
        if(validationResult){
            const { data } = await axios.get(validationResult.url,{xmlMode: true});
            const $ = cheerio.load(data);
            const title = $("head title").text();
            const ogtitle = $('meta[property="og:title"]').attr('content');
            const ogtwittertitle = $('meta[property="twitter:title"]').attr('content');
            const ogdescription = $('meta[property="og:description"]').attr('content');
            const twitterdescription = $('meta[property="twitter:description"]').attr('content');
            const description = $('meta[name="description"]').attr('content');
            const authorName = $('meta[name="author"]').attr('content');
            const published_time = $('meta[property="article:published_time"]').attr('content');
            const last_updated =  $('meta[name="last-updated"]').attr('content');
            const twitterImage = $('meta[name="twitter:image"]').attr('content');
    
            const blogUrl = $('meta[property="og:url"]').attr('content');
            const eachBlogContent = { title:[], description:[], blogUrl:"" , authorname:'' , published_time:[],twitterImage:'',  images:[]};
    
            eachBlogContent.title.push(title, ogtitle , ogtwittertitle)
            eachBlogContent.description.push(ogdescription,twitterdescription,description)
            eachBlogContent.authorname = authorName
            eachBlogContent.blogUrl = blogUrl
            eachBlogContent.published_time.push(published_time, last_updated)
            eachBlogContent.twitterImage = twitterImage
            eachBlogContent.images = images
            blogDetails.push(eachBlogContent)

            res.json(blogDetails)
        }
    }catch(error){
        next(error)
    }
}