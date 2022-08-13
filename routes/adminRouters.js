const express = require('express');
const { CreateAdminUser } = require('../controllers/admin/AdminController');

const router = express.Router();

router.post('/', CreateAdminUser);

module.exports = router;

