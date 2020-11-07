var express = require('express')
var controller = require('../controllers/room.controller')
var router = express.Router()

router.get('/api/room',controller.findAll)
router.get('/api/rooms/featured', controller.findFeatured)
router.get('/api/room/:id',controller.findOne)
router.get('/api/room/:id/bookingroom',controller.findOne)

module.exports = router;