const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const authorSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 30 * 86400, // 30 days
	},
});

const Author = mongoose.model("author", authorSchema);

module.exports =  Author;
