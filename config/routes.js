const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');

router.get('/', controller.base);

// router.get('/login', usersController.login)

module.exports = router;


