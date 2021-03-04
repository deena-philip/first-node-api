//@ts-check

const express = require('express')
const controller = require('../controllers/post')
const validator = require('../validators')

// Multer: file upload
const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, 'uploaded_file' + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })

const router = express.Router()

router.post('/post/add', validator.createPostValidator, controller.createPost)
router.get('/posts', controller.getPosts)
router.post('/post/upload', upload.single('sampleFile'), validator.createUploadPostValidator, controller.upload)

module.exports = router