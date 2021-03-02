//@ts-check

const EmailRegex = /.+\@.+\..+/

exports.createPostValidator = (req, res, next) => {
    req.check('title', 'Title should not be empty').notEmpty().trim()
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
    handleError(req, res, next)
}

exports.addFavoriteValidator = (req, res, next) => {
    req.check('title', 'Title should not be empty').notEmpty().trim()
    req.check('url', 'Url is required').notEmpty().trim()
    handleError(req, res, next)
}

exports.removeFavoriteValidator = (req, res, next) => {
    req.check('url', 'Url is required').notEmpty().trim()
    handleError(req, res, next)
}

exports.createSignupValidator = (req, res, next) => {
    // console.log('req', req.body)
    req.check('name', 'Name is required').notEmpty()
    req.check('email')
        .notEmpty()
        .withMessage('Email is required')
        .matches(EmailRegex)
        .withMessage('Email is not valid')
        .trim()
    req.check('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be min 6 characters')
        .trim()
    handleError(req, res, next)
}

exports.createSigninValidator = (req, res, next) => {
    req.check('email')
        .notEmpty()
        .withMessage('Email is required')
        .matches(EmailRegex)
        .withMessage('Email is not valid')
        .trim()
    req.check('password')
        .notEmpty()
        .withMessage('Password is required')
        .trim()
    handleError(req, res, next)
}

exports.createForgotPasswordValidator = (req, res, next) => {
    req.check('email')
        .notEmpty()
        .withMessage('Email is required')
        .matches(EmailRegex)
        .withMessage('Email is not valid')
        .trim()
    return handleError(req, res, next)
}

function handleError(req, res, next) {
    const errors = req.validationErrors()
    if (errors) {
        const firstErr = errors.map(err => err.msg)[0]
        return res.status(400).json({ error: firstErr })
    }
    next()
}