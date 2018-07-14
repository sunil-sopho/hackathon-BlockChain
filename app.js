var express = require('express');
// for mailing
// var nodemailer = require('nodemailer');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var app = require('./ApplicationInstance');
var passport = require('passport');
// var mongoose = require('mongoose');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
// var configDB = require('./backend/Models/database.js');
var compression = require('compression');
var _ = require("underscore");
var mainRoutes = require('./backend/routes/MainRoutes')
    ,FacebookStrategy  =     require('passport-facebook').Strategy
    , User = require('./backend/Models/user');
var connection = require('./backend/Models/db_model');
var config = require('./backend/config/config')

// configuration  for mongo ===============================================================
// mongoose.connect(configDB.url); // connect to our database

// require('./backend/Models/passport')(passport); // pass passport for configuration

// Passport session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
passport.use(new FacebookStrategy({
    clientID: config.facebook_api_key,
    clientSecret:config.facebook_api_secret ,
    callbackURL: config.callback_url
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      //Check whether the User exists or not using profile.id
      //Further DB code.

      // connection.query("SELECT * from user_info where user_id="+profile.id,function(err,rows,fields){
      //   if(err) throw err;
      //   if(rows.length===0)
      //     {
      //       console.log("There is no such user, adding now");
      //       connection.query("INSERT into user_info(user_id,user_name) VALUES('"+profile.id+"','"+profile.displayName+"')");
      //       // -6 digits
      //       // console.log(profile.id);
      //     }
      //     else
      //       {
      //         console.log("User already exists in database");
      //       }
      //     });
        var name = profile.displayName
        profile.name = name
        // profile.lastname = name[1]
        console.log(profile)
          User.findById(profile.id).then(user => {
            if(user == null){
                console.log("Creating user\n")
                User.create(profile)
            }else{
                console.log("user already exists")
            }
             return done(null,user);
          });

     
    });
  }
));


app.use(logger('dev'));
app.use(compression());
app.use(express.static(path.resolve(__dirname, 'client')));
//app.use('/courses', express.static(path.resolve(__dirname, 'client')));
app.set('port', process.env.PORT || 4000);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('views', __dirname + '/client/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(session({ secret: 'keyboard cat', key: 'sid'}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(cookieParser());

// required for cookie session
app.use(session({ 
key:'user_sid',
secret: 'letthegamebegins',
resave:false,
saveUninitialized:false,
cookie:{
    expires:600000
} 

}));



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        console.log(req.session.user);
        res.redirect(req.session.user.Role);
    } else {
        next();
    }    
};

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
       successRedirect : '/',
       failureRedirect: '/login'
  }),
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
app.use('/', mainRoutes);
app.listen(app.get('port'), function () {
    console.log('Application running in port '+ app.get('port'));
});