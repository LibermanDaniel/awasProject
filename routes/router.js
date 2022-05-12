const express = require('express');
const mongoose = require("mongoose")
const dbs = require("../config/sqlite")
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/User")
const {ensureAuthenticated} = require('../config/auth');

const router = express.Router();

router.get("/", (req,res) => {
    res.render("homepage")
})

router.get("/dashboard",ensureAuthenticated, (req,res) => {
    let name = req.query.filename
    let query = 'select * from employees where Firstname=\"' + name + ';'
    // let query = 'SELECT table_name FROM dba_tables;'
    let params = []
    console.log(query)
    dbs.all(query, params, (err, rows) => {
        if (err) {
            res.render("dashboard")
            return;
        }
        if(rows) {
            console.log(rows)
            res.render("dashboard", {"params":rows})
        }
    });
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
        successRedirect: '/dashboard',
        failureRedirect: '/register',
    })(req, res, next)
})

router.post('/logout', async (req, res) => {
    await res.logout();
    res.redirect('/');
  });

router.get(("*"), (req,res) => {
    res.redirect('/')
})

module.exports = router