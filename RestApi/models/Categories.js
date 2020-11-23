const mongoose = require('mongoose');

var Categories = mongoose.model('Categories',
{
    name: {type:String, required: true}
});

module.exports = {Categories}
