// load mongoose since we need it to define a model
    var mongoose = require('mongoose');

    module.exports = mongoose.model('book', {
        _id: String,
        title: String,
        link: String,
        authors: [{
            type: String
        }],
        thumbnail : String,
        subscribers:[{
                type: mongoose.Schema.Types.ObjectId, ref: 'User'
            }]
    });