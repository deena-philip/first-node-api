//@ts-check
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
// represents Post scheme in db
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Title is required',
        minlength: 4,
        maxlength: 150
    },
    body: {
        type: String,
        required: 'Body is required',
        minlength: 4,
        maxlength: 2000
    },
    created: { type: Date, default: Date.now },
    postedBy: { type: ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Post', postSchema)