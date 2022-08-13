const mongooes = require('mongoose')

const UserCreateSchema = mongooes.Schema({
    id:{
        type:Number,
        required:false
    },
    name:{
        type:String,
        required:false
    },
    passsword:{
        type:String,
        required:false,
    },
    email:{
        type:String,
        required:false
    },
    mobile_number:{
        type:Number
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
