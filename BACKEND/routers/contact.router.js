var express = require('express')
var controller = require('../controllers/contact.controller')
var router = express.Router();

router.get('/page/contact',controller.findAll)
router.post('/page/contact',controller.create)
router.get('/page/contact/:id',controller.delete)

module.exports = router;