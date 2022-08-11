require('dotenv').config({path: '.env'});

const express = require('express');
const db = require('./config/dbConnection');
const todoRouter = require('./routes/todoRouters')
const {defaultErrorHandler, notFoundHandler} = require('./middleware/common/errorHandler')
const app = express();
const port = process.env.PORT;
db.databseConnection()
app.use(express.json());
// app.use(cors());

app.use(todoRouter)
app.use(notFoundHandler);
app.use(defaultErrorHandler);

app.listen(port,()=>{
    console.log(`Server listening on ${port}`)
})