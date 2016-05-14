var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

// Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/

// set up a mongoose model
var RequestBookSchema = new Schema({
    bookid: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    requestdate: {
        type: Date,
        default:Date.now,
    },
    status: {
        type: String    }
});

module.exports = mongoose.model('RequestBook', RequestBookSchema);
