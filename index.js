const express = require('express')
// request logger middleware
const morgan = require('morgan')
// mongoose
const mongoose = require('mongoose')
// Configuring dotenv
const dotenv = require('dotenv')
dotenv.config()

const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const postRoutes = require('./routes/post')
const favoriteRoutes = require('./routes/favorite')
const authRoutes = require('./routes/auth')
// bring in routes


// db
mongoose.connect(process.env.MONGO_URI,
    { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log('DB connected')
    })
mongoose.connection.on('error', (err) => {
    console.log(`DB connection error: ${err.message}`)
})

const port = process.env.PORT || 3000

// express app
const app = express()
// middleware for tracking routes
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(expressValidator())
app.use('/api', authRoutes)
app.use('/api', postRoutes)
app.use('/api', favoriteRoutes)
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ error: 'Unauthorized' })
    }
    next()
})

app.listen(port, () => {
})
console.log(`Express server running at http://localhost:${port}/`)