var express = require('express');
var router = express.Router();
//var apiJS = require('../public/javascripts/index');
var home = require(__dirname, 'views/index');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
