
const { AppError, ERROR, ERRORCODE } = require("../../utils/appError.utils")
const MESSAGE = require('../../utils/errorMessges.utils')
const { generateSerachKeyWord } = require('../../utils/searchKeywordAlgo.utils')
const mongoose = require('mongoose')
const treebank = require('talisman/tokenizers/words/treebank')
const doubleMetaphone = require('talisman/phonetics/double-metaphone')
/**
 * Below are all necessary modules we are used for store blogs details
 */
// const Author = require('../../models/blog/authors.model')
const Blogs = require('../../models/blog/blog.model')
const Websites = require('../../models/blog/website.model')
const Category = require('../../models/masters/category.model')
const Authors = require("../../models/blog/authors.model")
const Schema = mongoose.Schema;

/**
 * ********************************************************************
 */

/*1. check if this blog url is already exists
2. if exists then step 9. if not exists then
3. check if this is a valid category
4. if valid category
5. Check if base url of this website is stored
6. check if this website is accessible for scraping
7. if website is accessible then 
8. store the data
9. Update the content*/

exports.addBlogData = async (req, res) => {

    const { contentResult, authorResult, createdby } = req;
    const searchBlogContent = generateSerachKeyWord(contentResult.title + contentResult.description)
    try {
        let blogIdUrlId
        let websiteId
        let categoryID
        let authorId

        const blog = await Blogs.findOne({ blogUrl: contentResult.blogUrl })
        console.log(blog)
        if(blog != null){
            blogIdUrlId = blog._id
            updateParams ={
                title:contentResult.title,
                description:contentResult.description,
                blogBanner:contentResult.blogBanner,
                searchKeyWord:searchBlogContent
            }
            return await Blogs.findByIdAndUpdate(blogIdUrlId, updateParams) 
        }else{
            const category = await Category.findOne({ _id: contentResult.categoryID })
            categoryID = category._id;
            if(category){
                let baseUrl = new URL (contentResult.blogUrl)
                const websitesData = await Websites.findOne({ baseUrl: baseUrl.origin })
                if(websitesData){
                    websiteId = websitesData._id;
                }else{
                    let websiteParas = {
                        baseUrl:baseUrl.origin,
                        name:baseUrl.hostname

                    }
                    const website = new Websites(websiteParas)
                    const websiteCreated = await website.save()
                    websiteId = websiteCreated._id;
                }
                
                const authorData = await Authors.findOne({ websiteId: websiteId, name: authorResult.name})
                if(authorData){
                    authorId = authorData._id
                }else{
                    const searchData = generateSerachKeyWord(authorResult.name)

                    const authorParams = {
                        name:authorResult.name,
                        image:authorResult.image,
                        websiteId:websiteId,
                        searchKeyWords:searchData
                    }
                    const authors = new Authors(authorParams)
                    const authorParamsCreated = await authors.save()
                    authorId = authorParamsCreated._id;
                }

               const contentparams={
                title:contentResult.title,
                description:contentResult.description,
                blogUrl:contentResult.blogUrl,
                blogBanner:contentResult.blogBanner,
                websiteId:websiteId,
                authorID:authorId,
                publishedDate:contentResult.publishedDate,
                categoryID:categoryID,
                searchKeyWord:searchBlogContent,
                createdBy:createdby
               } 
               console.log(contentparams)
               const contentCreat = new Blogs(contentparams)
               const contentCreated = await contentCreat.save()
               return contentCreated
            }
        }



    } catch (err) {
        throw new AppError(MESSAGE.SERVERSIDERROR, ERROR.InternalServerError, ERRORCODE.InternalServerError)
    }

}



// try{
//     const titleDescription = req.title + ' '+ req.description
//     const data = treebank(titleDescription)
//     let result = []
//     data.forEach(element => {
//         const doubleMetaphoneResult = doubleMetaphone(element)
//         doubleMetaphoneResult.forEach(doubleMetaphoneElement => {
//             if(!result.includes(doubleMetaphoneElement)){
//                 result.push(doubleMetaphoneElement)
//             }
//         });
//     });
//     const response = {...req,searchKeyWord:result}
//     const addBlog = new Blogs(response)
//     const saveBlog = await addBlog.save()
//     return saveBlog
// }catch{
//     throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)
// }



/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.FindPost = async (req, res) => {
    try {
        const post = await Blogs.findOne({ blogUrl: req })
        return post;
    } catch (error) {
        throw new AppError(MESSAGE.SERVERSIDERROR, ERROR.InternalServerError, ERRORCODE.InternalServerError)
    }
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.GetPosts = async (req, res) => {
    let page = 1
    let limit = 10
    const id = req.query.category
    if (Object.keys(req.query).length && req.query.hasOwnProperty('page')) {
        page = parseInt(req.query.page)
    } else if (Object.keys(req.query).length && req.query.hasOwnProperty('limit')) {
        limit = parseInt(req.query.limit)
    }

    const startIndex = (page - 1) * limit
    let documentsCount = await Blogs.countDocuments().exec()
    totalPage = documentsCount - 1 //// -1 we use for avoid the count of current user loggedin
    totalPage = Math.ceil(totalPage / limit)
    const results = {}
    results.pagination = {
        page: page,
        limit: limit,
        totalPage: totalPage
    }


    try {
        const query = {
            ...(req.query.hasOwnProperty('category') && { category: req.query.category })
        }
        results.results = await Blogs.findOne(query).select({
            'searchKeyWord': 0,
            '__v': 0
        }).skip(startIndex).limit(limit).exec();
        return results;
    } catch {

        throw new AppError(MESSAGE.SERVERSIDERROR, ERROR.InternalServerError, ERRORCODE.InternalServerError)

    }
}