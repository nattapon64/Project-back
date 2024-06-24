const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-contorller')
const authenticate = require('../middlewares/admin')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/me', authenticate,userController.getme)


module.exports = router;