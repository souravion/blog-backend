require('dotenv').config({path: '.env'});
const express = require('express');
const db = require('./config/dbConnection');
const {defaultErrorHandler, notFoundHandler} = require('./middleware/common/errorHandler')
const adminRouter = require('./routes/adminRouters')
const app = express();
var cookieParser = require('cookie-parser')

db.databseConnection()
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use('/admin',adminRouter)

app.use(notFoundHandler);
app.use(defaultErrorHandler);

app.listen(process.env.PORT,()=>{
    console.log(`Server listening on ${process.env.PORT}`)
})