//@ts-check
const mongoose = require('mongoose')
const crypto = require('crypto')
const Post = require('./post')
const uuidv1 = require('uuid').v1

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    dob: { require: false, type: Date },
    email: { type: String, required: true, trim: true },
    hashed_password: { type: String, required: true },
    salt: { type: String },
    created: { type: Date, default: Date.now },
    resetPasswordLink: { type: String, default: "" }
})

userSchema.virtual('password')
    .set(function (password) {
        this._pw = password
        this.salt = uuidv1()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function () {
        return this._pw
    })

userSchema.methods = {
    authenticate: function (plainTextPassword) {
        return this.encryptPassword(plainTextPassword) === this.hashed_password
    },
    encryptPassword: function (password) {
        if (!password) return ''
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (err) {
            console.log("Error hashing password: ", err.message)
            return ''
        }
    }
}

userSchema.pre('remove', function (next) {
    Post.remove({ postedBy: this._id }).exec()
    next()
})

module.exports = mongoose.model('User', userSchema)