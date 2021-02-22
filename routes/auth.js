//@ts-check

const express = require('express')
const controller = require('../controllers/auth')
const { createSignupValidator, createSigninValidator } = require('../validators')

const router = express.Router()

router.post('/signup', createSignupValidator, controller.signup)
router.post('/signin', createSigninValidator, controller.signin)
router.get('/signout', controller.signout)

module.exports = router