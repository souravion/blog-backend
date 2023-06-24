const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const authors = new Schema({
    name:{
        type: String,
        // required: [true, 'Author name is required']
    },
    image:{
        type: String,
    },
    websiteId: {
        type: Schema.Types.ObjectId
    },
    totalFollowers: {
        type : Number,
        default : 0
    },
    searchKeyWords:{
        type:Array,
        // required:[true, "Search Key word is requred"]
    },
    status:{
        type: String,
        enum: "Active" || "Inactive",
        default:'Active'
    }
})

const Authors = mongoose.model("Author", authors);
module.exports =  Authors;