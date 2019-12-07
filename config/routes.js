const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');
const userController = require('../controllers/user.controller')

router.get('/', controller.base);

router.get('/users/new', userController.new)

router.get('/users/profile',  userController.profile)
router.post('/users/profile',  userController.create)


router.get('/login', userController.login)
router.post('/login', userController.doLogin)

router.post('/logout', userController.logout)

module.exports = router;


