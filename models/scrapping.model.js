
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
        type : String,
        required: [true, 'Blog Url is required']
    },
    imageUrl:{
        type:String
    },
    authorImage:{
        type:String
    },
    authorname:{
        type:String
    },
    publishedDate:{
        type: String
    },
    category:{
        type: Schema.Types.ObjectId,
        required:[true, 'Category id is required']
    },
    postUrl:{
        type: String,
        required:[true, 'Post Url is requrired']
    },
    createdBy: {
		type:Schema.Types.ObjectId
	
	},
    updatedBy: {
	type: Schema.Types.ObjectId
	},
    status:{
        type: String,
        enum: "Active" || "Inactive",
        default:'Active'
    },
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 30 * 86400, // 30 days
	},
});

const Blogs = mongoose.model("Blog", blogs);

module.exports =  Blogs;

