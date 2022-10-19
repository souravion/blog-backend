
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
    status:{
        type: String,
        enum: "Active" || "Inactive",
        default:'Active'
    },
	createdAt: {
		type: Date,
		default: Date.now
	},
});

const Blogs = mongoose.model("Blog", blogs);

module.exports =  Blogs;

