
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const blogs = new Schema({
    title:{
        type: String,
        required:[true, 'Title is required']
    },
    description:{
        type: String,
        require:[true, 'description is required']
    },
    blogUrl:{
        type: String,
        required: [true, 'Blog Url is required']
    },
    blogBanner:{
        type: String,
        required: [true, 'Blog Banner Url is required']
    },
    websiteId:{
        type: Schema.Types.ObjectId,
        required: [true, 'Website Id is required']
    },

    authorID:{
        type: Schema.Types.ObjectId,
        // required: [true, 'Author Id is required']
    },
    publishedDate:{
        type: String
    },
    categoryID:{
        type: Schema.Types.ObjectId,
        required:[true, 'Category id is required']
    },
    searchKeyWord:{
        type:Array,
        required:[true, "Search Key word is requred"]
    },
    createdBy: {
		type: Schema.Types.ObjectId,

	},
    updatedBy: {
	    type: Schema.Types.ObjectId
	},
    updatedOn: {
	    type: Date
	},
    status:{
        type: String,
        enum: "Active" || "Inactive",
        default:'Active'
    }
});

const Blogs = mongoose.model("Blog", blogs);

module.exports =  Blogs;

