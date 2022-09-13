
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AddAdminSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    permission:{
        type:Object,
        default:null
    },
    status:{
        type: String,
        enum:"Pending" || "Active",
        default:'Pending'
    },
    createdby:{
        type: Schema.Types.ObjectId,
		required: true,
        trim:true
    },
});

const AdminUser = mongoose.model("adminuser", AddAdminSchema);

module.exports =  AdminUser;