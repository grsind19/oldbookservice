var express = require('express');
var bookRoutes = express.Router();
var passport = require('passport');
var config = require('../../config/database');
var BookController = require('./bookscontroller');

bookRoutes.post('/initialload',
		 passport.authenticate('jwt', { session: false }),
		 BookController.initialload);

bookRoutes.post('/save',
		 passport.authenticate('jwt', { session: false }),
		 BookController.saveBook);

bookRoutes.post('/search',
		 passport.authenticate('jwt', { session: false }),
		 BookController.search);

bookRoutes.post('/savecategory',
		 passport.authenticate('jwt', { session: false }),
		 BookController.createCategory);

bookRoutes.post('/savesubcategory',
		 passport.authenticate('jwt', { session: false }),
		 BookController.createSubCategory);

module.exports = bookRoutes;