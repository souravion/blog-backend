const express = require('express');
const { AddAdminController,GeAdminController , UpdateAdminController } = require('../controllers/admin/addAdmin.controller');
const { CheckTokenController, AdminLoginController ,AdminLogoutController ,GetAdminInfoController, ChangeAdminStatusController, RemoveAdminController } = require('../controllers/admin/adminAuth.controller');
const { RemoveCtegoryByIdController, FindCtegoryByIdController, CategoryController , GetCategoryController , ChangeCategoryStatusController, CategoryUpdateController } = require('../controllers/admin/category.controller');
const { AddFaqController , UpdateFaqsController, GetFaqsController, ChangeFaqStatusController ,FindFaqByIdController,RemoveFaqByIdController } = require('../controllers/admin/faq.controller');
const { AddPermissionLevelController , GetPermissionController ,SavePermissionController , UpdatePermissionLevelController } = require('../controllers/admin/permission/permission.controller');
const { ScrapingController , AddBlogController, GetPostsController } = require('../controllers/admin/scrapping.controller');
const { SerachAlgo } = require('../controllers/admin/search.controller');

const checkLogin = require('../middleware/common/checkLogin')
const router = express.Router();

// router.post('/', CreateAdminUser);


router.post('/addSubadmin',checkLogin, AddAdminController);
router.post('/updateSubadmin/:id',checkLogin, UpdateAdminController);
router.get('/getAdmins',checkLogin, GeAdminController);

router.post('/login', AdminLoginController);
router.delete('/logout', AdminLogoutController);
router.post('/changepassword', AdminLogoutController);
router.post('/checkToken' , checkLogin,CheckTokenController) 
router.get('/getadminInfo/:id' , checkLogin,GetAdminInfoController) 
router.post('/statusUpdate/:id' , checkLogin,ChangeAdminStatusController) 
router.delete('/removeAdmin/:id' , checkLogin,RemoveAdminController) 

/** Category Section */
router.post('/addCategory', checkLogin, CategoryController);
router.get('/getCategory', checkLogin, GetCategoryController);
router.post('/status/:id', checkLogin, ChangeCategoryStatusController);
router.post('/categoryUpdate/:id', checkLogin, CategoryUpdateController);
router.get('/findCategory/:id', checkLogin, FindCtegoryByIdController);
router.delete('/removeCategory/:id', checkLogin, RemoveCtegoryByIdController);
/**End*/

/**FAQ */
router.post('/addFaq', checkLogin, AddFaqController);
router.get('/getFaqs', checkLogin, GetFaqsController);
router.post('/updateFaq/:id', checkLogin, UpdateFaqsController);
router.post('/faqstatus/:id', checkLogin, ChangeFaqStatusController);
router.get('/findFaq/:id', checkLogin, FindFaqByIdController);
router.delete('/removeFaq/:id', checkLogin, RemoveFaqByIdController);
/**END */
/** Permission*/
router.post('/addPermissionLevel', checkLogin, AddPermissionLevelController);
router.put('/updatePermissionLevel/:id', checkLogin, UpdatePermissionLevelController);
router.get('/getPermissions', checkLogin, GetPermissionController);
router.put('/savePermissions/:id', checkLogin, SavePermissionController);



/** */
/*********************** */
router.post('/scraping', checkLogin, ScrapingController);
router.post('/addPost',  checkLogin, AddBlogController);
router.get('/getPosts', checkLogin, GetPostsController);
/** End */

router.post('/search', SerachAlgo);


module.exports = router;

