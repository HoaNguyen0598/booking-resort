var express = require('express')
var controller = require('../controllers/roomtype.controller');
var router = express.Router()
const {ensureAuthenticated} = require("../config/auth")

router.get('/page/roomtype',ensureAuthenticated,controller.index)
router.post('/page/roomtype',controller.create)
router.get('/page/roomtype/:id',controller.delete)

router.get('/page/roomTypeEdit/:id',controller.getEdit)
router.post('/page/roomTypeEdit/:id',controller.editRoomType)

module.exports = router;