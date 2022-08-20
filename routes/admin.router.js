const express = require('express');
const { AddAdminUserController } = require('../controllers/admin/addAdminUser.controller.js');

const { CreateAdminUser, LoginController ,CategoryController } = require('../controllers/admin/auth.controller');
const checkLogin = require('../middleware/common/checkLogin')
const router = express.Router();
router.post('/', CreateAdminUser);
router.post('/login', LoginController);
router.post('/addAdminUser', checkLogin, AddAdminUserController);
module.exports = router;

