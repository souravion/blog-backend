const express = require('express');
const { GetCategoryController } = require('../controllers/admin/category.controller');
// const { CreateAdminUser } = require('../controllers/admin/AdminController');

const userRoute = express.Router();

userRoute.get('/getCategory', GetCategoryController);

module.exports = userRoute;

