const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')
// const uploadCloud = require('../config/cloudinary.config')

router.get('/', controller.base);

router.get('/users/new', userController.new) // Signin para crear nuevo usuario

router.get('/login', userController.login)
router.post('/login', userController.doLogin)

router.get('/users/profile', authMiddleware.isAuthenticated, userController.profile)
router.post('/users/profile', authMiddleware.isAuthenticated, userController.create)

router.post('/logout', userController.logout)

module.exports = router;