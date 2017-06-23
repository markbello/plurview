//ARTISTS ROUTES

var express     = require("express");
var router      = express.Router();
var Artist      = require("../models/artist");
var middleware  = require("../middleware");


//INDEX - SHOW ALL ARTISTS

router.get("/", function(req, res) {
    Artist.find({}, function(err, allArtists){
        if(err){
            console.log(err);
        } else{
            res.render("artists/index", {artists:allArtists, page: "artists"});
        }
    });
});

//CREATE ARTISTS

router.post("/", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var logo = req.body.logo;
    var blurb = req.body.blurb;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newArtist = {name: name, logo: logo, blurb: blurb, author: author};
    Artist.create(newArtist, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/artists");
        }
    });
    
});

//NEW - SHOW FORM TO CREATE NEW ARTIST

router.get("/new", middleware.isLoggedIn,function(req, res) {
    res.render("artists/new");
});

// SHOW - SHOW MORE INFO ABOUT ONE ARTIST

router.get("/:id", function(req, res){
    Artist.findById(req.params.id).exec(function(err, foundArtist){
        if(err){
            console.log(err);
        } else{
            res.render("artists/show", {artist: foundArtist});
        }
    });
    
});

// EDIT ARTIST 
router.get("/:id/edit", middleware.checkArtistOwnership, function(req, res){
   Artist.findById(req.params.id, function(err, foundArtist){
       if(err){
           req.flash("error", "Please login to edit vanue information");
           res.redirect("back");
       } else{
           res.render("artists/edit", {venue: foundArtist});
       }
   }); 
}); 

// UPDATE ARTIST
router.put("/:id", middleware.checkArtistOwnership, function(req, res){
   Artist.findByIdAndUpdate(req.params.id, req.body.venue, function(err, updatedArtist){
       if(err){
           res.redirect("/artists");
       } else{
           res.redirect("/artists/" + req.params.id);
       }
   }); 
});

// DESTROY ROUTE
router.delete("/:id", middleware.checkArtistOwnership, function(req, res){
    Artist.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/artists");
        } else{
            res.redirect("/artists");
        }
    });
});

module.exports = router;