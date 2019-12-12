const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const artistController = require('../controllers/artist.controller')
// const uploadCloud = require('../config/cloudinary.config')

router.get('/', controller.base);

router.get('/users/new', userController.new) // Signin para crear nuevo usuario

router.get('/login', userController.login)
router.post('/login', userController.doLogin)

router.get('/profile', userController.myProfile);
router.get('/users/:id', userController.profile)
router.post('/users/:username', authMiddleware.isAuthenticated, userController.create)

router.get('/artist/:category', artistController.listByCategory)
// router.get('/artist/:category', artistMiddleware.isArtist, artistController.listByCategory) // Ejemplo

router.post('/logout', userController.logout)

module.exports = router;

// editar con un middleware que compruebe que el id de la sesión sea igual que el de la ruta.