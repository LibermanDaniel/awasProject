const express = require("express")
const passport = require("passport")
const mongoose = require("mongoose")
const session = require("express-session")

// Express
const app = express()

// Database keys
const db = require("./config/keys").MongoURI;

mongoose.connect(db, {useNewUrlParser: true})
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.log(err))

// Session
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
}))

// EJS
app.use(express.static("./public"))
app.set("view engine", "ejs")

// Bodyparser
app.use(express.urlencoded({extended: false}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())
app.use(passport.authenticate('session'))

// Passport config
require("./config/passport")(passport)

// Router
app.use("/", require("./routes/router"))

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
