const express = require('express');
const { AddAdminUserController } = require('../controllers/admin/AddAdminUser.controller.js');

const { CreateAdminUser, LoginController ,CategoryController } = require('../controllers/admin/Admin.controller');
const checkLogin = require('../middleware/common/checkLogin')
const router = express.Router();
router.post('/', CreateAdminUser);
router.post('/login', LoginController);
router.post('/category', checkLogin ,CategoryController);
router.post('/addAdminUser', checkLogin, AddAdminUserController);
router.post('/addBhola', (req, res)=>{
    res.send('Hellow bhola')
});
module.exports = router;

