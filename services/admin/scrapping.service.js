const Blogs = require('../../models/scrapping.model')
const { AppError,ERROR,ERRORCODE } = require("../../utils/appError.utils")
const MESSAGE = require('../../utils/errorMessges.utils')
const treebank = require('talisman/tokenizers/words/treebank')
const doubleMetaphone = require('talisman/phonetics/double-metaphone')

exports.addBlog = async(req, res)=>{
    console.log(req)
    try{
        const titleDescription = req.title + ' '+ req.description
        const data = treebank(titleDescription)
        let result = []
        data.forEach(element => {
            const doubleMetaphoneResult = doubleMetaphone(element)
            doubleMetaphoneResult.forEach(doubleMetaphoneElement => {
                if(!result.includes(doubleMetaphoneElement)){
                    result.push(doubleMetaphoneElement)
                }
            });
        });
        const response = {...req,searchKeyWord:result}
        const addBlog = new Blogs(response)
        const saveBlog = await addBlog.save()
        return saveBlog
    }catch{
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)
    }
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.FindPost = async(req,res)=>{
    try{
        const post = await Blogs.findOne({blogUrl:req})
        return post;
    }catch(error) { 
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)
    }
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
 exports.GetPosts = async(req,res)=>{
    try{
        const posts = await Blogs.find({}).select({
            'searchKeyWord':0
        })
        return posts;
    }catch {
        throw new AppError(MESSAGE.SERVERSIDERROR,ERROR.InternalServerError,ERRORCODE.InternalServerError)

    }
}