const express = require('express');
// const { CreateAdminUser } = require('../controllers/admin/AdminController');

const userRoute = express.Router();

userRoute.post('/', (req, res)=>{
    res.send('Hi Bhola')
});

module.exports = userRoute;

