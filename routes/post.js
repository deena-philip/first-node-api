//@ts-check

const express = require('express')
const controller = require('../controllers/post')
const validator = require('../validators')

const router = express.Router()

router.post('/post/add', validator.createPostValidator, controller.createPost)
router.get('/posts', controller.getPosts)

module.exports = router