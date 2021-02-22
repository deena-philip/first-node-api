//@ts-check
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 150
    },
    content: { type: String },
    author: { type: String },
    description: { type: String },
    publishedAt: { type: String },
    url: { type: String, required: true },
    urlToImage: { type: String },
    user: { type: ObjectId, ref: 'User' }
})

module.exports = mongoose.model('News', newsSchema, 'favoriteNews')