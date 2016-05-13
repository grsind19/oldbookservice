var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database'); // get db config file
var port = process.env.PORT || 8080;

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// log to console
app.use(morgan('dev'));

// Error handler middleware
app.use(function(err, req, res, next) {
  console.error(err);
  return res.status(500).json({ status: 'error', code: 'unauthorized' });
});

// Use the passport package in our application
app.use(passport.initialize());


app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,Authorization');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});
// demo Route (GET http://localhost:8080)
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});



mongoose.connect(config.database);

require('./config/passport')(passport);

app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

// handle the callback after facebook has authenticated the user
app.get('/auth/facebook/callback',
    passport.authenticate('facebook'),function(req,res){
    	console.log(req.user);
    	res.send({'success':'true'});
    });


app.use('/api', require('./app/users/userroutes.js'));
app.use('/api', require('./app/books/booksroutes.js'));

// Start the server
app.listen(port);
console.log('There will be dragons: http://localhost:' + port);
