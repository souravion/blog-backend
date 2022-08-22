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
    is_active:{
        type:String,
        enum:["active", "inactive"]
    },
    date:{
        type:Date,
        default:Date.now
    }
});



module.exports = {
    UserCreateSchema
};
