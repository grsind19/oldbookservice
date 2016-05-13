var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    configAuth = require('./auth'),
    FacebookStrategy = require('passport-facebook').Strategy;

// load up the user model
var User = require('../app/users/usermodel.js');
var config = require('./database'); // get db config file

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(Id, done) {
        User.findById(Id, function(err, user) {
            done(err, user);
        });
    });
    //passport with JWT
    var opts = {};
    opts.secretOrKey = config.secret;
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({ id: jwt_payload.id }, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));

    //passport with facebook
    passport.use(new FacebookStrategy({
            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL
        },
        function(token, refreshToken, profile, done) {
            process.nextTick(function() {
                User.findOne({ 'facebook.id': profile.id }, function(err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        var newUser = new User();
                        newUser.name="rak";
                        newUser.password="tot";
                        newUser.facebook.id = profile.id; // set the users facebook id                   
                        newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
                        newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                        newUser.facebook.email = "grs"; // facebook can return multiple emails so we'll take the first
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });
            });

        }));
};
