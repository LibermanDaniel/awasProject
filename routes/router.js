const express = require('express');
const mongoose = require("mongoose")
const dbs = require("../config/sqlite")
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/User")
const { ensureAuthenticated } = require('../config/auth');

const router = express.Router();

router.get("/", (req, res) => {
    res.render("homepage")
})

router.get("/dashboard",ensureAuthenticated, async (req,res) => {
    let name = req.query.name
    let query = 'select title from employees where lastname=\"' + name + '\";'
    let params = []
    let msg

    const username = req.user.username
    const usernameDB = await User.find({ username: username }).exec()

    if (usernameDB[0].rights) {
        console.log("admin")
        msg = "flag-awas-666c6167"
    }
    else {
        msg = "The flag is not here :("
    }

    dbs.all(query, params, (err, rows) => {
        if (err) {
            res.render("dashboard", {"message":msg})
            return;
        }
        if(rows) {
            res.render("dashboard", {"params":rows, "message":msg})
        }
    });
})

router.get("/register", (req, res) => {
    res.render("register", { "error": "" })
})

router.post("/register", async (req,res) => {
    // toggle check box - true/false 
    const adminRights = req.body.admin ? true : false
    const newUsername = req.body.username
    const newPassword = req.body.password

    const sameUsername = await User.find({ username: newUsername }).exec()
    if (sameUsername.length) {
        res.render("register", { "error": `${newUsername} is taken try another one` })
    }
    else {
        const doc = new User({
            username: newUsername,
            password: newPassword,
            rights: adminRights
        })
        doc.save()
            .then((response) => console.log(response))
        res.render("register", { "error": "You have registered successfully" })
    }
})

router.get("/login", (req, res) => {
    res.render("login", { "error": "" })
})

router.post("/login", async (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/register',
    })(req, res, next)
})

router.get('/logout', async (req, res) => {
    req.logout();
    res.redirect('/');
});

router.post('/delete', async (req, res) => {
    mongoose.connection.db.dropCollection("users", (err,result) => {
        console.log("Collection droped");
    })
    const doc = new User({
        username: 'admin',
        password: 'spongebob',
        rights: true
    })
    doc.save()
        .then((response) => console.log(response))
    res.status(200).redirect('/')

})

router.get(("*"), (req, res) => {
    res.redirect('/')
})

module.exports = router