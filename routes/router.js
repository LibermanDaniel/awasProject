const express = require('express');
const mongoose = require("mongoose")
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/User")

const router = express.Router();

router.get("/", (req,res) => {
    res.render("homepage")
})

router.get("/register", (req,res) => {
    res.render("register", {"error": ""})
})


router.post("/register", async (req,res) => {
    // toggle check box - true/false 
    const adminRights =  req.body.admin ? true : false
    const newUsername = req.body.username
    const newPassword = req.body.password

    const sameUsername = await User.find({username: newUsername}).exec()
    if (sameUsername.length) {
        res.render("register", {"error": `${newUsername} is taken try another one`})
    }
    else {
        const doc = new User({
            username: newUsername, 
            password: newPassword,
            rights: adminRights
        })
        console.log(doc)
        doc.save()
            .then((response) => console.log(response))
        res.render("register", {"error":"You have registered successfully"})
    }
})

router.get("/login", (req,res) => {
    res.render("login", {"error": ""})
})

router.post("/login", async (req,res,next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/register',
    })(req, res, next)
})

router.get(("*"), (req,res) => {
    res.redirect('/')
})

module.exports = router