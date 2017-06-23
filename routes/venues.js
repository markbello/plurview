//VENUES ROUTES

var express     = require("express");
var router      = express.Router();
var Venue       = require("../models/venue");
var middleware  = require("../middleware");


//INDEX - SHOW ALL VENUES

router.get("/", function(req, res) {
    Venue.find({}, function(err, allVenues){
        if(err){
            console.log(err);
        } else{
            res.render("venues/index", {venues:allVenues, page: "venues"});
        }
    });
});

//CREATE VENUES

router.post("/", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var address = req.body.address;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newVenue = {name: name, price: price, image: image, address: address, author: author};
    Venue.create(newVenue, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/venues");
        }
    });
    
});

//NEW - SHOW FORM TO CREATE NEW VENUE

router.get("/new", middleware.isLoggedIn,function(req, res) {
    res.render("venues/new");
});

// SHOW - SHOW MORE INFO ABOUT ONE VENUE

router.get("/:id", function(req, res){
    Venue.findById(req.params.id).populate("comments").exec(function(err, foundVenue){
        if(err){
            console.log(err);
        } else{
            res.render("venues/show", {venue: foundVenue});
        }
    });
    
});

// EDIT VENUE 
router.get("/:id/edit", middleware.checkVenueOwnership, function(req, res){
   Venue.findById(req.params.id, function(err, foundVenue){
       if(err){
           req.flash("error", "Please login to edit vanue information");
           res.redirect("back");
       } else{
           res.render("venues/edit", {venue: foundVenue});
       }
   }); 
}); 

// UPDATE VENUE
router.put("/:id", middleware.checkVenueOwnership, function(req, res){
   Venue.findByIdAndUpdate(req.params.id, req.body.venue, function(err, updatedVenue){
       if(err){
           res.redirect("/venues");
       } else{
           res.redirect("/venues/" + req.params.id);
       }
   }); 
});

// DESTROY ROUTE
router.delete("/:id", middleware.checkVenueOwnership, function(req, res){
    Venue.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/venues");
        } else{
            res.redirect("/venues");
        }
    });
});

module.exports = router;