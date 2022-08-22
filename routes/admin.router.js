const express = require('express');


const { AdminUserSingUpController , CreateAdminUser, AdminLoginController ,AdminLogoutController } = require('../controllers/admin/adminAuth.controller');
const { RemoveCtegoryByIdController, FindCtegoryByIdController, CategoryController , GetCategoryController , ChangeCategoryStatusController, CategoryUpdateController } = require('../controllers/admin/category.controller');
const { AddFaqController , UpdateFaqsController, GetFaqsController, ChangeFaqStatusController ,FindFaqByIdController,RemoveFaqByIdController } = require('../controllers/admin/faq.controller');
const { ScrappingController } = require('../controllers/admin/scrapping.controller');

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

/*********************** */
router.post('/scraping', checkLogin, ScrappingController);
/** End */


module.exports = router;

