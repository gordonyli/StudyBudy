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

var accessToken;
var accessTokenSecret;

//Define MySQL parameter in Config.js file.
var connection = mysql.createConnection({
  host     : config.host,
  user     : config.username,
  password : config.password,
  database : config.database
});

//Connect to Database only if Config.js parameter is set.

if(config.use_database==='true')
{
    connection.connect();
}

// Passport session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// Use the TwitterStrategy within Passport.

passport.use(new TwitterStrategy({
    consumerKey: config.twitter_api_key,
    consumerSecret:config.twitter_api_secret ,
    callbackURL: config.callback_url
  },
  function(token, tokenSecret, profile, done) {
    process.nextTick(function () {
      //Check whether the User exists or not using profile.id
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

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/auth/twitter', passport.authenticate('twitter'));


app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect : '/account', failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

app.listen(8000);

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

var Twitter = require('twitter-node-client').Twitter;

//Callback functions
var error = function (err, response, body) {
  console.log('ERROR [%s]', err);
};
var success = function (data) {
  console.log('Data [%s]', data);
};

//Get this data from your twitter apps dashboard
var tokens = {
  "consumerKey": "kYHSEtFujG3ybYHFyMoKziNeY",
  "consumerSecret": "7BtdOfoY5TylNiK53vL7R0DNHDNcXrYHX9sLDc5L4EiQ3sIaP5",
  "accessToken": accessToken,
  "accessTokenSecret": accessTokenSecret,
  "callBackUrl": "http://www.facebook.com/l.php?u=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Ftwitter%2Fcallback&h=qAQHlGevN"
};

// make a directory in the root folder of your project called data
// copy the node_modules/twitter-node-client/twitter_config file over into data/twitter_config`
// Open `data/twitter_config` and supply your applications `consumerKey`, 'consumerSecret', 'accessToken', 'accessTokenSecret', 'callBackUrl' to the appropriate fields in your data/twitter_config file

var twitter = new Twitter(tokens);

//Example calls

//
// Get 10 tweets containing the hashtag haiku
//

twitter.getSearch({'q':'#haiku','count': 10}, error, success);

