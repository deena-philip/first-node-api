//@ts-check
const News = require('../models/news')
const userController = require('./user')

exports.addFavorite = async (req, res) => {
    const user = await userController.getUser(req.authUser.userId)
    // Add favorite news to db
    const favoriteNews = new News(req.body)
    favoriteNews.user = user
    favoriteNews.save((err, result) => {
        if (err) {
            console.log('Unable to save favorite news, error: ', err.message)
            return res.status(400).json({ error: err })
        }
        console.log('Saved favorite news')
        return res.json({ result: result })
    })
}

exports.getFavorites = (req, res) => {
    // console.log('authUser', req.authUser)
    const userId = req.authUser.userId
    console.log('UserId:', userId)
    News.find({ user: userId })
        .select('title content description url urlToImage publishedAt _id')
        .then(favorites => {
            console.log(`No. of favorites found: ${favorites.length}`)
            return res.json(favorites)
        }).catch(err => {
            console.log('Error: ', err.message)
            return res.send(400).json({ error: err.message })
        })
}