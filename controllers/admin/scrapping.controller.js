const { urlSchema } = require("../../validation/url.validation")
const { appResponse } = require("../../utils/appResponse.utils");
const MESSAGE = require('../../utils/errorMessges.utils')
const axios = require("axios");
const cheerio = require("cheerio");
const scrappingService = require('../../services/admin/scrapping.service');
const { scrappingContentSchema, scrappingAuthorSchema } = require("../../validation/scrapping.valdiation");
const { checkBlogUrl } = require("../../utils/urls.utils");
const { dateFormatter } = require("../../utils/dateFormater.utils");

// const probe = require('probe-image-size');

exports.ScrapingController = async (req, res, next) => {
    try {
      const requestBody = {
        url: req.body.url
      }
  
      // Validate request body using Joi schema
      const validationResult = await urlSchema.validateAsync(requestBody)
  
      if (validationResult) {
        const { data } = await axios.get(validationResult.url, { xmlMode: true })
        const $ = cheerio.load(data)
        const jsonRaw = $("script[type='application/ld+json']")[0].children[0].data; 
        const result = JSON.parse(jsonRaw);
        console.log(result.image[0]);
        console.log(result.author.name);
        // Extract blog details from HTML using Cheerio
        const title = $("head title").text()
        const ogTitle = $('meta[property="og:title"]').attr('content')
        const twitterTitle = $('meta[property="twitter:title"]').attr('content')
        const ogDescription = $('meta[property="og:description"]').attr('content')
        const twitterDescription = $('meta[property="twitter:description"]').attr('content')
        const description = $('meta[name="description"]').attr('content')
        const authorName = $('meta[name="author"]').attr('content')
        const authorName2 = $('.author').text().replace(/\s+/g, ' ').trim()
        const publishedTime = $('meta[property="article:published_time"]').attr('content')
        const lastUpdated = $('meta[name="last-updated"]').attr('content')
        const postPublished = $('.post-published').text().replace(/\s+/g, ' ').trim()
        const twitterImage = $('meta[name="twitter:image"]').attr('content')
        const blogUrl = $('meta[property="og:url"]').attr('content')
  
        // Extract images from blog content
        const images = []
        $('img').each(function () {
          images.push($(this).attr('src'))
        })
  
        // Create object with extracted blog details
        const blogDetails = {
          title: [title, ogTitle, twitterTitle],
          description: [ogDescription, twitterDescription, description],
          authorName: [authorName, authorName2],
          publishedTime: [publishedTime, lastUpdated, postPublished],
          twitterImage,
          blogUrl,
          images
        }
  
        res.json(blogDetails)
      }
    } catch (error) {
      next(error)
    }
  }

  
  exports.AddBlogController = async (req, res, next) => {
    const { content, author } = req.body;
    try {
      const isValidUrl = checkBlogUrl(content.blogUrl);
      const formatDate = dateFormatter(content.publishedDate);
  
      if (isValidUrl) {
        const contentParams = {
          title: content.title,
          description: content.description,
          blogUrl: content.blogUrl,
          blogBanner: content.blogBanner,
          publishedDate: formatDate,
          categoryID: content.categoryID
        };
  
        const contentValidationResult = await scrappingContentSchema.validateAsync(contentParams);
        const authorValidationResult = await scrappingAuthorSchema.validateAsync(author);
  
        scrappingService.addBlogData({
          contentResult: contentValidationResult,
          authorResult: authorValidationResult,
          createdby: res.locals.userId
        })
          .then(() => {
            return appResponse(res, 200, MESSAGE.CREATED);
          })
          .catch((error) => {
            next(error);
          });
      } else {
        return appResponse(res, 404, MESSAGE.INVALIDBLOGURL);
      }
    } catch (error) {
      next(error);
    }
  };

  

exports.GetPostsController= async(req, res,next)=>{
    try{
        
        const getPosts = await scrappingService.GetPosts(req)
        
        if(Object.keys(getPosts).length){
            res.json({
                status:200,
                message:'Fetch sucessfully!',
                data:getPosts
            })
        }else {
            return  appResponse(res, 404, MESSAGE.NOTFOUND)
        }
    }catch(error){
        next(error)
    }
}






// exports.AddBlogController = async(req , res , next)=>{
//     const {content , author } = req.body
//     try{
//         const isValidUrl = checkBlogUrl(req.body.content.blogUrl)
//         const formatDate = dateFormatter(content.publishedDate)
//         if(isValidUrl){
//             let contentParams = {
//                 title:content.title,
//                 description:content.description,
//                 blogUrl:content.blogUrl,
//                 blogBanner:content.blogBanner,
//                 publishedDate:formatDate,
//                 categoryID:content.categoryID
//             }
          
//             const contentResult = await scrappingContentSchema.validateAsync(contentParams)

//             const authorResult = await scrappingAuthorSchema.validateAsync(author)

//             scrappingService.addBlogData({contentResult,authorResult, createdby:res.locals.userId}).then((result)=>{
//                 return appResponse(res, 200, MESSAGE.CREATED)
//             }).catch((error)=>{
//                next(error)
//             })
            
//         }else{
//             return appResponse(res, 404, MESSAGE.INVALIDBLOGURL)
//         }
       
//         // const result = req.body

//         // scrappingService.addBlogData({...result, createdby:res.locals.userId}).then((result)=>{
//         //     return appResponse(res, 200, MESSAGE.CREATED)
//         // }).catch((error)=>{
//         //    next(error)
//         // })

//         // const doExsit = await scrappingService.FindPost(result.blogUrl)
//         // if(!doExsit){

//         // }else{
//         //     const errorMessage  =`${ result.blogUrl} ${MESSAGE.EXISTS}`
//         //     return  appResponse(res, 403, errorMessage)
//         // }
//     }catch(error){
//         next(error)
//     }
// }










// exports.ScrappingController = async (req, res, next)=>{
//     let blogDetails = {}
//     let images = []
//     try{
//         const postparam = {
//             url:req.body.url
//         }
//         const validationResult= await urlSchema.validateAsync(postparam)
        
//         if(validationResult){
//             const { data } = await axios.get(validationResult.url,{xmlMode: true});
//             const $ = cheerio.load(data);
//             const title = $("head title").text();
//             const ogtitle = $('meta[property="og:title"]').attr('content');
//             const ogtwittertitle = $('meta[property="twitter:title"]').attr('content');
//             const ogdescription = $('meta[property="og:description"]').attr('content');
//             const twitterdescription = $('meta[property="twitter:description"]').attr('content');
//             const description = $('meta[name="description"]').attr('content');
//             const authorName = $('meta[name="author"]').attr('content');
//             const authorName2 = $('.author').text(); // we need to be remove new line extra space , tab etc
//             const published_time = $('meta[property="article:published_time"]').attr('content');
//             const last_updated =  $('meta[name="last-updated"]').attr('content');
//             const post_published =  $('.post-published').text();
//             //featured
//             //img-caption
//             // <p class="img-caption" style="text-align: right;"><img class="lazy" style="width: 100%; max-width: 100%;" src="https://media.giphy.com/media/oz9y20nb1b0XgFRqAa/giphy.gif">via Giphy</p>
//             // <a rel="author" href="https://foreignpolicy.com/author/marc-lynch/"><strong>Marc Lynch</strong></a>
//             //ref link https://foreignpolicy.com/2014/02/03/king-kendrick-and-the-ivory-tower/
//             //Abstract case https://makeupforlunch.blogspot.com/2022/08/quick-healthy-cake-bread-loaf-recipe.html
//             //<span itemprop="datePublished" style="margin-left: 15px;">Sep 01, 2022, 23:10 PM</span> 
//             //ref link https://www.forbesmiddleeast.com/money/cryptography-and-blockchain/us-federal-prosecutors-reportedly-asked-binance-for-internal-records
            
//             const twitterImage = $('meta[name="twitter:image"]').attr('content');
    
//             const blogUrl = $('meta[property="og:url"]').attr('content');
//             const eachBlogContent = { title:[], description:[], blogUrl:"" , authorname:[] , published_time:[],twitterImage:'',  images:[]};
    
//             eachBlogContent.title.push(title, ogtitle , ogtwittertitle)
//             eachBlogContent.description.push(ogdescription,twitterdescription,description)
//             eachBlogContent.authorname.push(authorName, authorName2)
//             eachBlogContent.blogUrl = blogUrl
//             eachBlogContent.published_time.push(published_time, last_updated , post_published)
//             eachBlogContent.twitterImage = twitterImage
//             eachBlogContent.images = images
//             blogDetails = eachBlogContent
//             res.json(blogDetails)
//         }
//     }catch(error){
//         next(error)
//     }
// }