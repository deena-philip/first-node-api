const express = require('express')
const controller = require('../controllers/news')
const validator = require('../validators')
const { requireSignin } = require('../controllers/auth')

const router = express.Router()

router.post('/favorite/add', requireSignin, validator.addFavoriteValidator, controller.addFavorite)
router.post('/favorite/remove', requireSignin, validator.removeFavoriteValidator, controller.removeFavorite)
router.get('/favorites', requireSignin, controller.getFavorites)

module.exports = router