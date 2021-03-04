const Post = require('../models/post')
const fs = require('fs/promises')

exports.getPosts = (req, res) => {
    Post.find()
        .select('title body _id') // select the fields required
        .then(posts => {
            console.log(`No. of posts found: ${posts.length}`)
            return res.json({ posts })
        }).catch(err => {
            console.log('Error: ', err.message)
            return res.status(400).json({ error: err.message })
        })
}

exports.createPost = (req, res) => {
    const post = new Post(req.body)
    // console.log('Req body:', req.body)
    console.log(`Creating Post: ${post}`)
    post.save((err, result) => {
        if (err) {
            console.log('Error saving post, ', err.message)
            return res.status(400).json({ err: err.message })
        } else {
            console.log('Saved post, ', result)
            return res.status(200).json({ post: result })
        }
    })
}

exports.upload = (req, res) => {
    var reqFile = req.file
    fs.readFile('uploads/' + reqFile.filename)
        .then(data => {
            console.log('------------------------------------------------')
            // console.log('Data:', Buffer.from(data).toString())
            console.log('------------------------------------------------')
        }).catch(err => {
            console.error('Error reading file:', err.message)
        })
    return res.json({ message: 'Upload done!' })
}


/*

(err, data) => {
            if (err) {
                console.error('Error reading file:', err.message)
                return
            }
            console.log('------------------------------------------------')
            console.log('Data:', Buffer.from(data).toString())
            console.log('------------------------------------------------')
        }


        */