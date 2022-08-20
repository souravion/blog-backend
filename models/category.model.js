
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AddCategorySchema = new Schema({

	name: {
		type: String,
		required: true,
        index: true,
	},
    image:{
        type:String
    },
    meta_title:{
        type:String,
    },
    slug:{
        type:String,
    },
    is_active:{
        type: String,
        default:'inactive'
    },
    isVerified:{
        type: Boolean,
        default:false,
        
    },
	createdby: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Category = mongoose.model("Category", AddCategorySchema);

module.exports =  Category;
