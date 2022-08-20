
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AddAdminSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    created_by:{
        type: Schema.Types.ObjectId,
		required: false
    },
    is_active:{
        type: [String],
        enum:["active", "inactive"],
        default:['inactive']
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const AddAdminUser = mongoose.model("AddAdminUsers", AddAdminSchema);

module.exports =  AddAdminUser;