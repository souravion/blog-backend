

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const contentSchema = new Schema({
	cat_id: {
		type: Schema.Types.ObjectId,
		required: true,
	},
    author_id: {
		type: Schema.Types.ObjectId,
		required: true,
	},
    title: {
		type: String,
		required: true,
	},
    img: {
		type: String,
		required: true,
	},
    blog_url: {
		type: String,
		required: true,
	},
    published_date: {
		type: String,
		required: true,
	},
    country: {
		type: Number,
		required: true,
	},

	createdAt: {
		type: Date,
		default: Date.now,
		expires: 30 * 86400, // 30 days
	},
});

const content = mongoose.model("contents", contentSchema);

module.exports =  content;