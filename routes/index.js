var express = require('express');
var router = express.Router();
var controller = require('../controllers/data.js');

router.get('/',controller.default);

module.exports = router;
