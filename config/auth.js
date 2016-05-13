// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
    'facebookAuth' : {
        'clientID'      : '242988972711399', // your App ID
        'clientSecret'  : '69974e75badc5cceaeb46378e0735dd8', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    }
};