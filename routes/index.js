var express = require('express');
var router = express.Router();
var back = require('../public/javascripts/backend');
var home = require(__dirname, 'views/index');

/* GET home page. */
router.get('/', function(req, res) {
	console.log("home page!");
  res.render('index', { title: 'Express' });
});

router.get('/send', function(req, res) {
	console.log("send! in index router!");
  var entered_emoji = req.query.entered_emoji;
  back.get_info(entered_emoji, function(data) {
    console.log("routes data", data);
    
    res.redirect('http://google.com');
    console.log("gets here");
    if (data == "sorry!"){
    	"got bad data!";
    }

  });
});



module.exports = router;
