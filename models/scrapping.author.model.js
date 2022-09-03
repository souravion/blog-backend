




const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const authorSchema = new Schema({
	name: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 30 * 86400, // 30 days
	},
});

const author = mongoose.model("authors", authorSchema);

module.exports =  author;
