const express = require('express');
const { CreateAdminUser, LoginController } = require('../controllers/admin/AdminController');
const checkLogin = require('../middleware/common/checkLogin')
const router = express.Router();

router.post('/', checkLogin, CreateAdminUser);
router.post('/login', LoginController);
module.exports = router;

