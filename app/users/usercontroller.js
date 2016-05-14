var mongoose = require('mongoose'),
    jwt = require('jwt-simple'),
    config = require('../../config/database'),
    passport = require('passport'),
    User = require('./usermodel');

exports.signup = function(req, res) {

    if (!req.body.email || !req.body.password) {
        res.json({ succes: false, msg: 'Please pass name and password.' });
    } else {
        var newUser = new User(req.body);
        newUser.save(function(err) {
            if (err) {
                console.log(err);
                res.json({ succes: false, msg: 'Username already exists.' });
            } else {
                res.json({ succes: true, msg: 'Successful created user!' });
            }
        });
    }
}

exports.authenticate = function(req, res) {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.send({ success: false, msg: 'Authentication failed. User not found.' });
        } else {
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    var token = jwt.encode(user, config.secret);
                    res.json({ success: true, token: 'JWT ' + token, user: user });
                } else {
                    res.send({ success: false, msg: 'Authentication failed. Wrong password.' });
                }
            });
        }
    });
}
exports.memberinfo = function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            email: decoded.email
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
            } else {
                return res.json({ success: true, user: user, msg: 'Welcome in the member area ' + user.email + '!' });
            }
        });
    } else {
        return res.status(403).send({ success: false, msg: 'No token provided.' });
    }
}

exports.changepwd = function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        console.log(decoded);
        User.findOne({
            email: decoded.email
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
            } else {
                user.password=req.body.password;
                user.save(function(err) {
                    if (err) {
                        res.json({ succes: false, msg: 'Change password failed' });
                    } else {
                        res.json({ succes: true, msg: 'Successful password changed!' });
                    }
                })
            }
        });
    } else {
        return res.status(403).send({ success: false, msg: 'No token provided.' });
    }
}

getToken = function(headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};
