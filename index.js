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
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));
}
app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080,()=>{
    console.log(`Server listening on ${process.env.PORT}`)
})