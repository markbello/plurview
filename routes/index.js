var express     = require("express");
var router      = express.Router();
var passport    = require("passport");
var User        = require("../models/user");

// ROOT ROUTE
router.get("/", function(req, res) {
    res.render("landing");
});

// AUTH ROUTES


// SHOW REGISTER FORM
router.get("/register", function(req, res){
    res.render("register", {page: "register"});
});

// HANDLE SIGN UP LOGIC
router.post("/register", function(req, res){
    var newUser = new User ({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to PLURview" + user.username);
            res.redirect("/venues");
        });
    });
    
});

// SHOW LOGIN FORM
router.get("/login", function(req, res){
    res.render("login", {page: "login"});
});

// HANDLE LOGIN LOGIC
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/venues",
        failureRedirect: "/login"
    }));
    
// LOGOUT ROUTE
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/venues");
});



module.exports = router;