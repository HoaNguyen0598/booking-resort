var express = require('express')
var controller = require('../controllers/tintuc.controller')
var router = express.Router()
const {ensureAuthenticated} = require("../config/auth")

router.get('/page/news',ensureAuthenticated,controller.findAll)
router.get('/page/news/:id',controller.delete)
router.post('/page/news',controller.create)

router.get('/page/newEdit/:id',controller.getEdit)
router.post('/page/newEdit/:id',controller.editNews)

module.exports = router;