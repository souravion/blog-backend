const mongoose = require("mongoose")
require('dotenv').config({path: '.env'});
const url = process.env.Url;
const opts = { useNewUrlParser: true, useUnifiedTopology: true };
databseConnection = async ()=> {
try{
    console.log('DataBase Connected successfully')
    return await mongoose.connect(url)
    
}catch(error){
    console.log(error);
}
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