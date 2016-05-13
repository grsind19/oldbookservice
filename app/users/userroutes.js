var express = require('express');
var apiRoutes = express.Router();
var passport = require('passport');
var jwt = require('jwt-simple');
var User = require('./usermodel');
var UserController = require('./usercontroller');
var config = require('../../config/database');


apiRoutes.post('/signup', UserController.signup);

apiRoutes.post('/authenticate', UserController.authenticate);

apiRoutes.get('/memberinfo',
		 passport.authenticate('jwt', { session: false }),
		 UserController.memberinfo);



module.exports = apiRoutes;
