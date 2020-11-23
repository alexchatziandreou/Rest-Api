const mongoose = require('mongoose');

var PostArticle = mongoose.model('PostArticle',
{
    title: {type:String, required: true},
    content: {type:String, required:true},
    // category: {type:String, required:true}

});

module.exports = {PostArticle}
