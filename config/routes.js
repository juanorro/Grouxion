const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const artistController = require('../controllers/artist.controller')
const contentController = require('../controllers/content.controller')
const commentsController = require('../controllers/comments.controller')
const paymentController = require('../controllers/payment.controller')
const uploadCloud = require('../config/cloudinary.config')

router.get('/', controller.base);

router.get('/users/new', userController.new) // Signin para pintar el formulario
router.post('/users/new', uploadCloud.single('profileimg'), userController.create) //creación del usuario

router.get('/login', userController.login)
router.post('/login', userController.doLogin)

router.get('/profile', userController.myProfile)
router.get('/users/:id', userController.profile)
router.get('/users/:id/edit', userController.edit)
router.post('/users/:_id', userController.myProfile)
router.post('/users/:_id', authMiddleware.isAuthenticated, userController.create)

router.post('/donation/:id', paymentController.donate)

//content
router.get('/users/content/:id', contentController.show)
router.post('/users/content/:id', contentController.create)

//likes
router.post('/users/content/:id/like', contentController.like)


//Comments
router.post('/users/comments/:id/:userId', commentsController.create)

//follows
router.get('/users/:id/follow', userController.showFollow)
router.post('/users/:id/follow', userController.follow)

router.get('/artist/:category', artistController.listByCategory)
// router.get('/artist/:category', artistMiddleware.isArtist, artistController.listByCategory) // Ejemplo

router.post('/logout', userController.logout)

module.exports = router;

// editar con un middleware que compruebe que el id de la sesión sea igual que el de la ruta.