var express = require('express');
var router = express.Router();

var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'yn2L4C7dpYzpU5g2ajm5w1JkX',
  consumer_secret: 'b4w0nV4W2NHQ2lb4yc2z3uTKD243UiKnXbNRwaKNWVYm35DV07',
  access_token_key: '723647766707245056-rH6tIGlC5xJiWXRBKaYRzXSJG9cKnhp',
  access_token_secret: 'S5ZL9cMCazTwbGeV6hGdpkmlbuIagkLqk1trP9N2zYxgR'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Twitter Political Scraper' });
});

router.get('/test', function(req, res, next) {
    res.render('test');
});

router.get('/twitter', function(req, res, next) {
  var params = {screen_name: 'apphack7'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if(error) console.log(error);
    console.log(tweets.length);
  });
});

module.exports = router;
