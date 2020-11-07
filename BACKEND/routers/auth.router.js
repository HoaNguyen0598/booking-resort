var express = require('express')
var controller = require('../controllers/auth.controller')
var router = express.Router()

//  router.get('/page/:p',controller.index)
router.get('/login',controller.login)
router.post('/login',controller.handleLogin)
router.get('/register',controller.getRegister)
router.post('/register',controller.addRegister)

router.get('/logout',controller.logout)



module.exports = router;