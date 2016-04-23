var express = require('express');
var router = express.Router();

var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'yn2L4C7dpYzpU5g2ajm5w1JkX',
  consumer_secret: 'b4w0nV4W2NHQ2lb4yc2z3uTKD243UiKnXbNRwaKNWVYm35DV07',
  access_token_key: '723647766707245056-rH6tIGlC5xJiWXRBKaYRzXSJG9cKnhp',
  access_token_secret: 'S5ZL9cMCazTwbGeV6hGdpkmlbuIagkLqk1trP9N2zYxgR'
});

//parse text files here
var fs = require('fs');
var positive = new Array();
var negative = new Array();

fs.readFile('public/tweets/positive.txt', function(err,data) {
  if(err) throw err;
  positive=data.toString().split('\n');
});

fs.readFile('public/tweets/negative.txt', function(err,data) {
  if(err) throw err;
  negative=data.toString().split('\n');
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Twitter Political Scraper', info: []});
});

router.post('/searchname', function(req,res) {
  var params = { screen_name: req.body.screen_name, count: 200 };
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    var neg_count = 0;
    var pos_count = 0;
    for(var i = 0; i < tweets.length; i++)
    {
      var line = tweets[i].text.split(" ");
      for(j = 0; j < line.length; j++)
      {
        loop: 
          for (q=0;q<negative.length;q++) {
            if (q<positive.length) {
              if (line[j]===positive[q]) {
                pos_count++;
                break loop;
              }
            }
            if (line[j]===negative[q]) {
              neg_count++;
              break loop;
            }
          }
      }
    }
    res.render('index', { title: 'Tweets', info: tweets, positive: pos_count, negative: neg_count});
  });
});

module.exports = router;
