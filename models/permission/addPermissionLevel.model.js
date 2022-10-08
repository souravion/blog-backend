const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PermissionLevelSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true,
    },
    parentId:{
       type: Schema.Types.Mixed,
       required:[true,"parentId is required"],
    },
    options:{
        type: Object,
        required:[true,"options is required"],
    },
    date:{
        type:Date,
        default:Date.now
    }
});
const PermissionLevel = mongoose.model("permissionLevel", PermissionLevelSchema);

module.exports =  PermissionLevel;
