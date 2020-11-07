var express = require('express')
var controller = require('../controllers/user.controller')
var router = express.Router()

router.get('/page/account',controller.findAll)
router.get('/page/account/:id',controller.delete)
router.post('/page/account',controller.create)
//router.post('/page/register',controller.create)

router.get('/page/accountEdit/:id',controller.getAccount)
router.post('/page/accountEdit/:id',controller.accountEdit)

module.exports = router;