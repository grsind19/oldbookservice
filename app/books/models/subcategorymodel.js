var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

// Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/

// set up a mongoose model
var SubCategorySchema = new Schema({
    subcategoryname: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('SubCategory', SubCategorySchema);
