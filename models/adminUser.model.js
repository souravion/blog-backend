
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AddAdminSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    createdby:{
        type: Schema.Types.ObjectId,
		required: false,
        trim:true
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

const AdminUser = mongoose.model("AdminUsers", AddAdminSchema);

module.exports =  AdminUser;