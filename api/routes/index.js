var express = require('express');
var router = express.Router();
var testDB=require('../src/db_test')
/* GET home page. */
router.get('/', testDB);

module.exports = router;
