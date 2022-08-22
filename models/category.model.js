
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const STATUS = ["active", "inactive"];

const AddCategorySchema = new Schema({

	name: {
		type: String,
		required: true,
        index: true,
        trim:true
	},
    image:{
        type:String,
        trim:true
    },
    meta_title:{
        type:String,
        trim:true
    },
    slug:{
        type:String,
        trim:true
    },
    is_active:{
        type: [String],
        enum:['active', 'inactive'],
        default:['inactive']
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
