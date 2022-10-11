const express = require('express');
const { AddAdminController,GeAdminController , UpdateAdminController } = require('../controllers/admin/addAdmin.controller');
const { CheckTokenController, AdminLoginController ,AdminLogoutController } = require('../controllers/admin/adminAuth.controller');
const { RemoveCtegoryByIdController, FindCtegoryByIdController, CategoryController , GetCategoryController , ChangeCategoryStatusController, CategoryUpdateController } = require('../controllers/admin/category.controller');
const { AddFaqController , UpdateFaqsController, GetFaqsController, ChangeFaqStatusController ,FindFaqByIdController,RemoveFaqByIdController } = require('../controllers/admin/faq.controller');
const { AddPermissionLevelController , GetPermissionController ,SavePermissionController } = require('../controllers/admin/permission/permission.controller');
const { ScrappingController } = require('../controllers/admin/scrapping.controller');
const { SerachAlgo } = require('../controllers/admin/search.controller');

const checkLogin = require('../middleware/common/checkLogin')
const router = express.Router();

// router.post('/', CreateAdminUser);


router.post('/addSubadmin',checkLogin, AddAdminController);
router.patch('/updateSubadmin/:id',checkLogin, UpdateAdminController);
router.get('/getAdmins',checkLogin, GeAdminController);

router.post('/login', AdminLoginController);
router.delete('/logout', AdminLogoutController);
router.patch('/changepassword', AdminLogoutController);
router.post('/checkToken' , checkLogin,CheckTokenController) 

/** Category Section */
router.post('/addCategory', checkLogin, CategoryController);
router.get('/getCategory', checkLogin, GetCategoryController);
router.patch('/status/:id', checkLogin, ChangeCategoryStatusController);
router.patch('/categoryUpdate/:id', checkLogin, CategoryUpdateController);
router.get('/findCategory/:id', checkLogin, FindCtegoryByIdController);
router.delete('/removeCategory/:id', checkLogin, RemoveCtegoryByIdController);
/**End*/

/**FAQ */
router.post('/addFaq', checkLogin, AddFaqController);
router.get('/getFaqs', checkLogin, GetFaqsController);
router.patch('/updateFaq/:id', checkLogin, UpdateFaqsController);
router.patch('/faqstatus/:id', checkLogin, ChangeFaqStatusController);
router.get('/findFaq/:id', checkLogin, FindFaqByIdController);
router.delete('/removeFaq/:id', checkLogin, RemoveFaqByIdController);
/**END */
/** Permission*/
router.post('/addPermissionLevel', checkLogin, AddPermissionLevelController);
router.get('/getPermissions', checkLogin, GetPermissionController);
router.put('/savePermissions/:id', checkLogin, SavePermissionController);



/** */
/*********************** */
router.post('/scraping', checkLogin, ScrappingController);
// router.post('/addBlog', checkLogin, AddBlogController);
/** End */

router.post('/search', SerachAlgo);


module.exports = router;

