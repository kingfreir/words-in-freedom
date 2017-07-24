var express = require('express');
var router = express.Router();
var controller = require('../controllers/index.js');

router.get('/',controller.default);

module.exports = router;
