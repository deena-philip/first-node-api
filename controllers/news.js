//@ts-check
const News = require('../models/news')
const userController = require('./user')

exports.addFavorite = async (req, res) => {
    const user = await userController.getUser(req.authUser.userId)

    // Check if favorite is already added in db
    var favoriteNews
    try {
        favoriteNews = await News.findOne({ url: req.body.url })
        if (favoriteNews) {
            console.log('get users', favoriteNews.get('users'))
            const users = favoriteNews.get('users')
            if (users.includes(user._id)) {
                return res.json({ error: 'User has already favorited this news' })
            }
            users.push(user)
            favoriteNews.set('users', users)
        } else {
            // Add favorite news to db
            favoriteNews = new News(req.body)
            favoriteNews.set('users', [user])
        }
        console.log('Users who favorited this news:', favoriteNews.get('users'))
        favoriteNews.save((err, result) => {
            if (err) {
                console.log('Unable to save favorite news, error: ', err.message)
                return res.status(400).json({ error: err })
            }
            console.log('Saved favorite news')
            return res.json({ message: 'Successfully added to favorites' })
        })
    } catch (err) {
        console.log('Error adding favorite,', err.message)
        return res.json({ error: err.message })
    }
}

exports.removeFavorite = async (req, res) => {
    const user = await userController.getUser(req.authUser.userId)

    // Check if favorite is already added in db
    var favoriteNews
    try {
        favoriteNews = await News.findOne({ url: req.body.url })
        if (!favoriteNews) {
            console.log('Favorite news not found')
            return res.json({ error: 'User hasn\'t favorited this news' })
        }
        console.log('get users', favoriteNews.get('users'))
        const users = favoriteNews.get('users')
        if (!users.includes(user._id)) {
            return res.json({ error: 'User hasn\'t favorited this news' })
        }
        const indexOfUser = users.indexOf(user._id)
        users.splice(indexOfUser, 1)
        if (users.length == 0) {
            favoriteNews.remove(null, (err, result) => {
                if (err) {
                    console.log('Unable to remove favorite news, error: ', err.message)
                    return res.status(400).json({ error: err })
                }
                console.log('Removed favorite news')
                return res.json({ message: 'Successfully removed from favorites' })
            })
        } else {
            favoriteNews.set('users', users)
            console.log('Users who favorited this news:', favoriteNews.get('users'))
            favoriteNews.save((err, result) => {
                if (err) {
                    console.log('Unable to save favorite news, error: ', err.message)
                    return res.status(400).json({ error: err })
                }
                console.log('Removed user from favorite news')
                return res.json({ message: 'Successfully removed from favorites' })
            })
        }
    } catch (err) {
        console.log('Error adding favorite,', err.message)
        return res.json({ error: err.message })
    }
}

exports.getFavorites = (req, res) => {
    // console.log('authUser', req.authUser)
    // console.log('token', req.headers.authorization)
    const userId = req.authUser.userId
    console.log('UserId:', userId)
    News.find({ users: userId })
        .select('title content description url urlToImage publishedAt source _id')
        .then(favorites => {
            console.log(`No. of favorites found: ${favorites.length}`)
            return res.json(favorites)
        }).catch(err => {
            console.log('Error: ', err.message)
            return res.send(400).json({ error: err.message })
        })
}