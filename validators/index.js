//@ts-check


const createPostValidator = (req, res, next) => {
    req.check('title', 'Title should not be empty').notEmpty()
    req.check('title', 'Title must be between 4 to 150 characters')
        .isLength({
            min: 4,
            max: 150
        })
    req.check('body', 'Body should not be empty').notEmpty()
    req.check('body', 'Body must be between 4 to 2000 characters')
        .isLength({
            min: 4,
            max: 2000
        })
    const errors = req.validationErrors()
    if (errors) {
        const firstError = errors.map(err => err.msg)[0]
        return res.status(400).json({ error: firstError })
    }
    next()

}

const createNewsValidator = (req, res, next) => {
    req.check('title', 'Title should not be empty').notEmpty()
    req.check('url', 'Url is required').notEmpty()
    const errors = req.validationErrors()
    if (errors) {
        const firstErr = errors.map(err => err.msg)[0]
        return res.status(400).json({ error: firstErr })
    }
    next()
}

const createSignupValidator = (req, res, next) => {
    console.log('req', req.body)
    req.check('name', 'Name is required').notEmpty()
    req.check('email', 'Email is required').notEmpty()
    req.check('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be min 6 characters')
    const errors = req.validationErrors()
    if (errors) {
        const firstErr = errors.map(err => err.msg)[0]
        return res.status(400).json({ error: firstErr })
    }
    next()
}

const createSigninValidator = (req, res, next) => {
    next()
}

module.exports = {
    createNewsValidator, createPostValidator,
    createSignupValidator, createSigninValidator
}