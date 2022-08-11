const mongooes = require("mongoose")
require('dotenv').config({path: '.env'});
const url = process.env.Url;
function databseConnection (){

    mongooes.connect(url).then(()=>{
    console.log('DataBase Connected successfully')
    }).catch((error)=>{
    console.log(error);
})
}
module.exports = {
    databseConnection
}