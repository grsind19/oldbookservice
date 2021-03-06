var mongoose = require('mongoose'),
    config = require('../../config/database'),
    passport = require('passport'),
    User = require('../users/usermodel'),
    Book = require('./models/bookmodel'),
    Category = require('./models/categorymodel'),
    SubCategory = require('./models/subcategorymodel'),
    RequestBook = require('./models/requestbooksmodel'),
    PostBook = require('./models/postedbooksmodel');

exports.search = function(req, res) {
    Book.find()
        .exec(function(err, books) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.jsonp(books);
            }
        });
}

exports.saveBook = function(req, res) {
    var book = new Book(req.body)
    book.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.jsonp(book);
        }
    });
}

exports.postBook = function(req, res) {
    var postbook = new PostBook(req.body)
    postbook.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            updateUserData(postbook);
        }
    });

    function updateUserData(postbook) {
        User.update({ _id: req.body.user }, { $push: { postedBooks: postbook._id } }, { upsert: true },
            function(err, userData) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.jsonp(postbook);
                }
            });
    }
}

exports.requestBook = function(req, res) {
    var requestbook = new RequestBook(req.body)
    requestbook.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            updateUserData(requestbook);
        }
    });

    function updateUserData(requestbook) {
        User.update({ _id: req.body.user }, { $push: { requestedBooks: requestbook._id } }, { upsert: true },
            function(err, userData) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.jsonp(requestbook);
                }
            });
    }
}

exports.userHistory = function(req, res) {
    User.find({ _id: req.user })
        .populate('postedBooks')
        .populate('requestedBooks')
        .exec(function(err, data) {
            if (err) {
                return res.status(400).send({
                    message: err
                });
            } else {
                res.jsonp(data);
            }
        })

}

exports.initialload = function(req, res) {
    Category.find()
        .populate('subcategory')
        .exec(function(err, category) {
            if (err) {
                return res.status(400).send({
                    message: err
                });
            } else {
                res.jsonp(category);
            }
        })
}
exports.createCategory = function(req, res) {
    var category = new Category(req.body)
    category.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.jsonp(category);
        }
    });
}
exports.createSubCategory = function(req, res) {
    var subcategory = new SubCategory(req.body)
    subcategory.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            res.jsonp(subcategory);
        }
    });
}
