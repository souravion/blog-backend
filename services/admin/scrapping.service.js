const Blogs = require('../../models/scrapping.model')
const { AppError,ERROR,ERRORCODE } = require("../../utils/appError.utils")
const MESSAGE = require('../../utils/errorMessges.utils')


exports.addBlog = async(req, res)=>{
    console.log(req)
    try{
        const addBlog = new Blogs(req)
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
