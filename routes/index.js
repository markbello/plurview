var express     = require("express");
var router      = express.Router();
var passport    = require("passport");
var User        = require("../models/user");
var Venue       = require("../models/venue");
var Artist      = require("../models/artist");
var middleware  = require("../middleware");

// ROOT ROUTE
router.get("/", function(req, res) {
    
    Venue.find({}, function(err, allVenues){
        if(err){
            console.log(err);
        } else{
            Artist.find({}, function(err, allArtists){
                if(err){
                    console.log(err);
                } else{
                    res.render("landing", {venues:allVenues, artists:allArtists});
                }
            });
            
        }
    });
    
    
    
});

// PROFILE ROUTE

router.get('/profile', middleware.isLoggedIn, function(req, res){
		res.render('profile', { user: req.user });
	});


// SHOW REGISTER FORM
router.get("/register", function(req, res){
    res.render("register", {page: "register"});
});

// HANDLE SIGN UP LOGIC
router.post("/register", function(req, res){
    var newUser = new User ({username: req.body.username});
    if(req.body.adminCode === "secretcode123"){
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to PLURview " + user.username);
            res.redirect("back");
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
        successRedirect: "/",
        failureRedirect: "/login"
    }));
    
// LOGOUT ROUTE
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("back");
});


module.exports = router;