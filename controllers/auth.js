//@ts-check
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const TOKEN_ALGORITHM = 'HS256'
const { sendEmail } = require('../helpers')

exports.signup = async (req, res) => {
    console.log(`Creating new user signup, email: '${req.body.email}'`)
    const userExists = await User.findOne({ email: req.body.email })
    if (userExists) {
        return res.status(400).json({ error: 'User with same email exists' })
    }
    const user = new User(req.body)
    try {
        await user.save()
        return res.json({ message: 'User signup successful' })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ error: err.message })
    }
}

exports.signin = (req, res) => {
    console.log('Signing in user')
    const { email, password } = req.body
    User.findOne({ email })
        .then(user => {
            if (!user) {
                console.log('User with email not found, ', email)
                return res.status(401)
                    .json({ error: 'User with that email does not exist' })
            }
            if (!user.authenticate(password)) {
                return res.status(401)
                    .json({ error: 'Email and password do not match' })
            }
            // Sign with jwt
            const token = getUserToken(user._id)
            res.cookie('token', token, { expire: (new Date() + 9999) })
            const { _id, name } = user
            console.log('User', name, 'has signed in')
            return res.json({ token, user: { _id, name, email } })
        })
        .catch(err => {
            console.log('Error finding user, ', err.message)
            return res.status(400)
                .json({ error: err.message })
        })
}

exports.signout = (req, res) => {
    console.log('Signing out user')
    res.clearCookie('token')
    return res.json({ message: 'User successfully signed out' })
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    // requestProperty: 'authUser',
    userProperty: 'authUser',
    algorithms: [TOKEN_ALGORITHM]
})

function getUserToken(userId) {
    return jwt.sign(
        // payload
        { userId: userId },
        process.env.JWT_SECRET,
        { algorithm: TOKEN_ALGORITHM, expiresIn: '1d' })
}

exports.forgotPassword = (req, res) => {
    const userEmail = req.body.email
    console.log('Forgot password: Finding user with email id', { email: userEmail })
    User.findOne({ email: userEmail }, (err, user) => {
        console.log(user)
        if (err || !user) {
            return res.status(401).json({ error: 'User with the given email doesn\'t exist' })
        }
        const token = getUserToken(user._id)
        const emailData = {
            from: 'deena93@ymail.com',
            to: userEmail,
            subject: 'Password reset instructions',
            text: `Please use the following link to reset your password: ${process.env.CLIENT_URL
                }/reset-password/${token}`,
            html: `<p>Please use the following link to reset your password:</p><p>${process.env.CLIENT_URL
                }/reset-password/${token}</p>`
        }
        return user.updateOne({ resetPasswordLink: token }, (err, success) => {
            if (err) {
                return res.status(400).json({ error: err.message })
            }
            // Send email
            sendEmail(emailData)
            return res.json({ message: `Email has been sent to ${userEmail}. Follow the instructions to reset your password.` })
        })
    })
}