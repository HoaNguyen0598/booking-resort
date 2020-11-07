var express = require('express')
var controller = require('../controllers/room.controller')
var router = express.Router()
const {ensureAuthenticated} = require("../config/auth")

router.get('/page/room',ensureAuthenticated,controller.findType)
router.get('/page/roomlist',ensureAuthenticated,controller.index)
router.post('/page/room',controller.create)
router.get('/page/room/:id',controller.deleteRoom)

router.get('/page/roomedit/:id',controller.getEditRoom)
router.post('/page/roomedit/:id',controller.editRoom)
module.exports = router;