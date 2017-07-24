var express = require('express');
var router = express.Router();
var controller = require('../controllers/data.js');

router.get('/',controller.default);

router.post('/upload',controller.upload);

router.post('/add',controller.add)

module.exports = router;
