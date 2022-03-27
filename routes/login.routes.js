const router = require('express').Router()
const passport = require('passport')
const Users = require('../models/users')
const jwt = require('jsonwebtoken')

const { createUser, getUser } = require('../controllers/user')

let refreshTokens = []

router.post('/create', (req, res) => createUser(req, res))
router.get(
    '/login',
    passport.authenticate('jwt', { session: false }),
    (req, res) => res.json(req.user)
)
router.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken === null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        console.log(user)
        if (err) {
            return res.sendStatus(403)
        }
        const accessToken = generateAccessToken(user)
        res.json({ accessToken })
    })
})

router.post('/login', (req, res) => {
    const { username, password } = req.body
    Users.findOne({
        username,
        password,
    })
        .then((user) => {
            if (user) {
                const accessToken = generateAccessToken(user)
                const refreshToken = jwt.sign(
                    user.toJSON(),
                    process.env.REFRESH_TOKEN_SECRET
                )
                refreshTokens.push(refreshToken)
                res.status(200).json({ accessToken, refreshToken })
            } else {
                res.status(400).json({
                    message: 'Username or password incorrect!',
                })
            }
        })
        .catch((err) => console.log(err))
})

function generateAccessToken(user) {
    return jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d',
    })
}

router.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token)
    res.json({ message: 'Successfully logged out' }).sendStatus(204)
})

module.exports = router
