const mongoose = require('mongoose')

const PermissionLevelSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true,
    },
    parentId:{
        type:Number |  Schema.Types.ObjectId,
    },
    options:{
        type: Object,
		// enum: ['view', 'add', 'edit','delete'],
		// default: 'view'
    },
    date:{
        type:Date,
        default:Date.now
    }
});
const PermissionLevel = mongoose.model("permissionLevel", PermissionLevelSchema);

module.exports =  PermissionLevel;
