var Twitter = require('twitter-node-client').Twitter;

//Callback functions
var error = function (err, response, body) {
    console.log('ERROR [%s]', err);
};
var success = function (data) {
    console.log('Data [%s]', data);
};

var Twitter = require('twitter-node-client').Twitter;

//Get this data from your twitter apps dashboard
var config = {
    "consumerKey": "kYHSEtFujG3ybYHFyMoKziNeY",
    "consumerSecret": "7BtdOfoY5TylNiK53vL7R0DNHDNcXrYHX9sLDc5L4EiQ3sIaP5",
    "accessToken": accessToken,
    "accessTokenSecret": accessTokenSecret,
    "callBackUrl": "http://www.facebook.com/l.php?u=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Ftwitter%2Fcallback&h=qAQHlGevN"
};

// make a directory in the root folder of your project called data
// copy the node_modules/twitter-node-client/twitter_config file over into data/twitter_config`
// Open `data/twitter_config` and supply your applications `consumerKey`, 'consumerSecret', 'accessToken', 'accessTokenSecret', 'callBackUrl' to the appropriate fields in your data/twitter_config file

var twitter = new Twitter(config);

//Example calls

twitter.getUserTimeline({ screen_name: 'BoyCook', count: '10'}, error, success);

twitter.getMentionsTimeline({ count: '10'}, error, success);

twitter.getHomeTimeline({ count: '10'}, error, success);

twitter.getReTweetsOfMe({ count: '10'}, error, success);

twitter.getTweet({ id: '1111111111'}, error, success);


//
// Get 10 tweets containing the hashtag haiku
//

twitter.getSearch({'q':'#haiku','count': 10}, error, success);

//
// Get 10 popular tweets with a positive attitude about a movie that is not scary
//

twitter.getSearch({'q':' movie -scary :) since:2013-12-27', 'count': 10, 'result\_type':'popular'}, error, success);
