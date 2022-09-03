const mongooes = require('mongoose')

const UserCreateSchema = mongooes.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    passsword:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    mobile_number:{
        type:Number,
        trim:true
    },
    created_by:{
        type:Number
    },
    status:{
        type:String,
        enum:"Pending" || "Active",
        default:"Pending"
    },
    date:{
        type:Date,
        default:Date.now
    }
});



module.exports = {
    UserCreateSchema
};
