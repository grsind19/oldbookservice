var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

// Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/

// set up a mongoose model
var PostBookSchema = new Schema({
    bookid: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postdate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('PostBook', PostBookSchema);
