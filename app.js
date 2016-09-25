var express           =     require('express')
  , passport          =     require('passport')
  , util              =     require('util')
  , TwitterStrategy   =     require('passport-twitter').Strategy
  , session           =     require('express-session')
  , cookieParser      =     require('cookie-parser')
  , bodyParser        =     require('body-parser')
  , config            =     require('./configuration/config')
  , mysql             =     require('mysql')
  , app               =     express();

var path = require('path');
//var favicon = require('serve-favicon');
//var logger = require('morgan');

var routes = require('./routes/index');
var users = require('./routes/users');
var reload = require('reload')


var accessToken;
var accessTokenSecret;

// var connection = mysql.createConnection({
//   host     : config.host,
//   user     : config.username,
//   password : config.password,
//   database : config.database
// });
//
// if(config.use_database==='true')
// {
//     connection.connect();
// }

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new TwitterStrategy({
    consumerKey: config.twitter_api_key,
    consumerSecret:config.twitter_api_secret ,
    callbackURL: config.callback_url
  },
  function(token, tokenSecret, profile, done) {
    process.nextTick(function () {
      accessToken = token;
      accessTokenSecret = tokenSecret;
      /*if(config.use_database==='true')
      {
      connection.query("SELECT * from user_info where user_id="+profile.id,function(err,rows,fields){
        if(err) throw err;
        if(rows.length===0)
          {
            console.log("There is no such user, adding now");
            connection.query("INSERT into user_info(user_id,user_name) VALUES('"+profile.id+"','"+profile.username+"')");
          }
          else
            {
              console.log("User already exists in database");
              console.log(token);
              console.log(tokenSecret);
            }
          });
      } */
      return done(null, profile);
    });
  }
));


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', key: 'sid'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.render('index', { user: req.user });
});

app.get('/search', function(req, res){
    res.render('search', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
    res.render('account', { user: req.user });
});

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
    passport.authenticate('twitter', { successRedirect : '/search', failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/');
    });

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/')
}

app.listen(3000);

var Twitter = require('twitter-node-client').Twitter;
//Callback functions
var error = function (err, response, body) {
  console.log('ERROR [%s]', err);
};

var ids = [];

var success = function (data) {
    var text = JSON.parse(data);
    var i = 0;
    while (text.statuses[i] != undefined) {
        if(ids.indexOf(text.statuses[i].id_str < 0)) {
            console.log("success id: " + text.statuses[i].id_str);
            ids.push(text.statuses[i].id_str);
        }
        i++;
    }
};

app.get('/ids',function(req, res){
    console.log('get id : ' + ids);
    res.send(ids);
    ids = [];
});

var tokens = {
  "consumerKey": "kYHSEtFujG3ybYHFyMoKziNeY",
  "consumerSecret": "7BtdOfoY5TylNiK53vL7R0DNHDNcXrYHX9sLDc5L4EiQ3sIaP5",
  "accessToken": accessToken,
  "accessTokenSecret": accessTokenSecret,
  "callBackUrl": "http://www.facebook.com/l.php?u=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Ftwitter%2Fcallback&h=qAQHlGevN"
};

var twitter = new Twitter(tokens);

var count = 3;
var classname = "Georgia Tech";


app.post('/className', function (req, res) {
    ids = [];
    twitter.getSearch({'q': req.body.name, 'count': count}, error, success);
    console.log("ids = " + ids);
    console.log("input = " + req.body.name);
    console.log("Got search");
});

app.post('/newTweet', function(req, res) {
    twitter.postTweet({'status': "laravel is beautiful"}, error, postSuccess);
});

var postSuccess = function() {
    console.log('success in newTweet');
}









