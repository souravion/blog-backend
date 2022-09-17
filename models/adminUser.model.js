

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
    desc:{
        type:String,
        required:true
    },
    permission:{
        type:Object,
        default:null
    },
    isEmailVarified:{
        type: Boolean,
        enum: false || true,
        default:false
    },
    image:{
        type:String,
        default:null
    },
    status:{
        type: String,
        enum:"Pending" || "Active",
        default:'Pending'
    },
    role:{
        type:String,
        default:"Admin"
    },
    createdby:{
        type: Schema.Types.ObjectId,
		required: true,
        trim:true
    },
    createdAt:{
        type: Date,
		default:Date.now
    },
});

const AdminUser = mongoose.model("adminuser", AddAdminSchema);

module.exports =  AdminUser;