const express = require('express');
const { GetUserCategoryController } = require('../controllers/admin/category.controller');
const { GetUserFaqsController } = require('../controllers/users/faq.controller');

// const { CreateAdminUser } = require('../controllers/admin/AdminController');

const userRoute = express.Router();

userRoute.get('/getCategory', GetUserCategoryController);
userRoute.get('/getFaqs', GetUserFaqsController);

module.exports = userRoute;

