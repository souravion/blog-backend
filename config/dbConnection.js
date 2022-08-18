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
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://koniat:<password>@koniatdb.ynfjwur.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
module.exports = {
    databseConnection
}