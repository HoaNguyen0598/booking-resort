var express = require('express')
var controller = require('../controllers/roomtype.controller')
var router = express.Router()

router.get('/api/roomtype',controller.findAll)

module.exports = router;