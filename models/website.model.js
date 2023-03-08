const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const websites = new Schema({
    name:{
        type: String,
         required: [true, 'Website name is required']
    },
    baseUrl: {
        type: String,
        required: [true, 'Base url is required']
    },
    totalBlog : {
        type: Number,
        default : 0
    },
    searchKeyWord:{
        type:Array,
        required:[true, "Search Key word is requred"]
    },
    activeBlogs: {
        type: String,
        enum: "Active" || "Inactive",
        default:'Active'
    },
    status: {
        type: String,
        enum: "Active" || "Inactive",
        default:'Active'
    }
})

const Websites = mongoose.model("websites", websites);

module.exports =  Websites;