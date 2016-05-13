var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');


// set up a mongoose model
var CategorySchema = new Schema({
    categoryname: {
        type: String,
        required: true
    },
    subcategory:[{
    	type: Schema.ObjectId,
        ref: 'SubCategory'
    }]
});

module.exports = mongoose.model('Category', CategorySchema);
