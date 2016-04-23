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
  res.render('index', { title: 'Twitter Political Scraper', info: []});
});

router.post('/searchname', function(req,res) {
  var params = { screen_name: req.body.screen_name, count: 1 };
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    var neg_count = 0;
    var pos_count = 0;
    console.log(process.env.positive.length);
    console.log(process.env.negative.length);
    for(var i = 0; i < tweets.length; i++)
    {
      var line = tweets[i].text.split(" ");
      for(j = 0; j < line.length; j++)
      {
        for (q=0;q<process.env.negative.length;q++) {
          if (q<process.env.positive.length) {
            if (line[j]===process.env.positive[q]) {
              pos_count++;
              break;
            }
          }
          if (line[j]===process.env.negative[q]) {
            neg_count++;
            break;
          }
        }
      }
    }
    console.log(pos_count);
    console.log(neg_count);
    res.render('index', { title: 'Tweets', info: tweets});
  });
});

module.exports = router;
