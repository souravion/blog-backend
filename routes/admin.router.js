const express = require('express');
const { AddAdminUserController } = require('../controllers/admin/addAdminUser.controller.js');

const { CreateAdminUser, AdminLoginController ,AdminLogoutController } = require('../controllers/admin/adminAuth.controller');
const { CategoryController , GetCategoryController } = require('../controllers/admin/category.controller.js');

const checkLogin = require('../middleware/common/checkLogin')
const router = express.Router();
router.post('/', CreateAdminUser);
router.post('/login', AdminLoginController);
router.delete('/logout', AdminLogoutController);
router.post('/addAdminUser', checkLogin, AddAdminUserController);
router.post('/addCategory', checkLogin, CategoryController);
router.get('/getCategory', checkLogin, GetCategoryController);
module.exports = router;

