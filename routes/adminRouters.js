const express = require('express');
const { AddAdminUserController } = require('../controllers/admin/addAdminUserControllerjs');

const { CreateAdminUser, LoginController ,CategoryController } = require('../controllers/admin/AdminController');
const checkLogin = require('../middleware/common/checkLogin')
const router = express.Router();
router.post('/', CreateAdminUser);
router.post('/login', LoginController);
router.post('/category', checkLogin ,CategoryController);
router.post('/addAdminUser', checkLogin, AddAdminUserController);
module.exports = router;

