const express = require('express');
const { GetUserCategoryController } = require('../controllers/admin/category.controller');
// const { CreateAdminUser } = require('../controllers/admin/AdminController');

const userRoute = express.Router();

userRoute.get('/getCategory', GetUserCategoryController);

module.exports = userRoute;

