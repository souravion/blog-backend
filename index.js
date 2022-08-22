require('dotenv').config({path: '.env'});
const express = require('express');
const db = require('./config/dbConnection');
const {defaultErrorHandler} = require('./middleware/common/errorHandler')
const adminRouter = require('./routes/admin.router')
const app = express();
var cookieParser = require('cookie-parser');
const { AppError } = require('./utils/appError.utils');
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const userRoute = require('./routes/user.router');
const swaggerJSDocs = YAML.load("./api.yaml");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));
db.databseConnection()
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use('/admin',adminRouter)
app.use('/user',userRoute)

app.all('*', (req, res, next) => {
    throw new AppError(`Requested URL ${req.path} not found!`, 404);
  })


app.use(defaultErrorHandler)


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