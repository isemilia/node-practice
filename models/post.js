const mongoose = require('mongoose');

// a schema defines the structure of documents that will be stored inside a collection in the database 
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });


// model takes in as the first argument the name of this model.
// it's going to pluralize this name 
// and then look for that collection inside the database
const Post = mongoose.model('Post', postSchema);

module.exports = Post; 