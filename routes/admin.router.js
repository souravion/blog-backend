const express = require('express');


const { AdminUserSingUpController , CreateAdminUser, AdminLoginController ,AdminLogoutController } = require('../controllers/admin/adminAuth.controller');
const { RemoveCtegoryByIdController, FindCtegoryByIdController, CategoryController , GetCategoryController , ChangeCategoryStatusController, CategoryUpdateController } = require('../controllers/admin/category.controller');
const checkLogin = require('../middleware/common/checkLogin')
const router = express.Router();

// router.post('/', CreateAdminUser);
router.post('/signUp', AdminUserSingUpController);
router.post('/login', AdminLoginController);
router.delete('/logout', AdminLogoutController);

/** Category Section */
router.post('/addCategory', checkLogin, CategoryController);
router.get('/getCategory', checkLogin, GetCategoryController);
router.patch('/status/:id', checkLogin, ChangeCategoryStatusController);
router.patch('/update/:id', checkLogin, CategoryUpdateController);
router.post('/findCategory/:id', checkLogin, FindCtegoryByIdController);
router.delete('/removeCategory/:id', checkLogin, RemoveCtegoryByIdController);

/**End*/


module.exports = router;

