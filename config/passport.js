const LocalStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const User = require("../models/User")

module.exports = async function(passport) {
    await passport.use(
        new LocalStrategy({usernameField: 'username'}, async(username, password, done) => {
            try {
                const user = await User.findOne({username: username})
                if(!user) {
                    return done(null, false, {message: "That username is taken."})
                }
                bcrypt.compare(password, user.password, (err,isMatch) => {
                    if (err) throw err
                    if (isMatch) {
                        return done(null, user)
                    }
                    else {
                        return done(null, false, {message: "Password incorrect"})
                    }
                })
            }
            catch(err){
                console.log(err)
            }
        })  
    )
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
}