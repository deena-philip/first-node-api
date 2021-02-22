//@ts-check

const User = require('../models/user')

exports.getUser = async (userId) => {
    try {
        const user = await User.findById(userId)
        console.log('user', user)
        const { _id, name, email } = user
        return { _id, name, email }
    } catch (err) {
        console.log('Unable to find user with id:', userId)
        return null
    }
}