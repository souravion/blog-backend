
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const FaqSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    is_active:{
        type: [String],
        enum:["active", "inactive"],
        default:['inactive']
    },
    createdby:{
        type: Schema.Types.ObjectId,
		required: false
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const Faq = mongoose.model("Faq", FaqSchema);

module.exports =  Faq;