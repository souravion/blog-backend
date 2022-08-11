const mongooes = require('mongoose')

const todoSchema = mongooes.Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    status:{
        type:String,
        enum:["active", "inactive"]
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = todoSchema;