const express = require('express');
const { CreateAdminUser, LoginController ,CategoryController } = require('../controllers/admin/AdminController');
const checkLogin = require('../middleware/common/checkLogin')
const router = express.Router();

router.post('/', CreateAdminUser);
router.post('/login', LoginController);
router.post('/category', checkLogin ,CategoryController);
module.exports = router;

