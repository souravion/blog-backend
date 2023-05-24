
const { AppError, ERROR, ERRORCODE } = require("../../utils/appError.utils")
const MESSAGE = require('../../utils/errorMessges.utils')
const { generateSerachKeyWord } = require('../../utils/searchKeywordAlgo.utils')
const mongoose = require('mongoose')

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

exports.addBlogData = async (req, res) => {

    const { contentResult, authorResult } = req;
    // const searchData = generateSerachKeyWord(contentResult.title + contentResult.description)
    try {
        let baseUrl = new URL (contentResult.blogUrl)
        let websiteId
        const category = await Category.findOne({ _id: contentResult.categoryID })
        console.log(category)
        if (category) {
            let baseUrl = new URL (contentResult.blogUrl)
            const websitesData = await Websites.findOne({ baseUrl: baseUrl })
            if(!websiteUrl){
                websiteId = websitesData._id
            }
        } else {
            // create
        }

    } catch (err) {
        // console.log(err)
        // console.log('else')
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