var express = require('express')
var controller = require('../controllers/booking.controller')
var router = express.Router()
const {ensureAuthenticated} = require("../config/auth")

router.get('/page/booking',ensureAuthenticated,controller.findAll)
router.post('/page/booking',controller.create)
router.get('/page/booking/:id',controller.delete)

module.exports = router;