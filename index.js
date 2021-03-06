require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')

// const Users = require('./models/users')
const userRoutes = require('./routes/login.routes')
const accountRoutes = require('./routes/account.routes')
const dbUrl = `${process.env.MONGO_URI}${process.env.DB_NAME}`

mongoose.connect(
    dbUrl,
    () => console.log('Connected to the database'),
    (err) => console.log(err)
)

app.use(express.json())
// app.use(passport.initialize())
app.use(cors())
app.use('/', userRoutes)
app.use('/user/account', accountRoutes)
// require('./config/passport')(passport)

app.listen(3000, () => {
    console.log(`Server is running on port 3000`)
})
