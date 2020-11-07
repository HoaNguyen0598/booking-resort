var express = require('express')
var controller = require('../controllers/tintuc.controller')
var router = express.Router()

router.get('/api/tintucnew', controller.findNew)
router.get('/api/news',controller.findAll)
router.get('/api/news/:id',controller.findOne)

module.exports = router;