//@ts-check

const express = require('express')
const controller = require('../controllers/auth')
const validator = require('../validators')

const router = express.Router()

router.post('/signup', validator.createSignupValidator, controller.signup)
router.post('/signin', validator.createSigninValidator, controller.signin)
router.get('/signout', controller.signout)
router.put('/forgot-password', validator.createForgotPasswordValidator, controller.forgotPassword)
router.put('/reset-password', validator.createResetPasswordValidator, controller.resetPassword)

module.exports = router