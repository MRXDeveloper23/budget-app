const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const Users = require('../models/users')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = `${process.env.SECRET}`
module.exports = (passport) => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            console.log(jwt_payload)
            Users.findById(jwt_payload.id)
                .then((user) => {
                    if (user) {
                        return done(null, user)
                    }
                    return done(null, false)
                })
                .catch((err) => console.log(err))
        })
    )
}
