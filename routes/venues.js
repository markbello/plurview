//VENUES ROUTES

var express     = require("express");
var router      = express.Router();
var Venue       = require("../models/venue");
var middleware  = require("../middleware");
var geocoder    = require("geocoder");


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
    var image = req.body.image;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newVenue = {name: name, image: image, author:author, location: location, lat: lat, lng: lng};
    // Create a new venue and save to DB
    Venue.create(newVenue, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to venues page
            console.log(newlyCreated);
            res.redirect("/venues");
        }
    });
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
           req.flash("error", "Please login to edit venue information");
           res.redirect("back");
       } else{
           res.render("venues/edit", {venue: foundVenue});
       }
   }); 
}); 

// UPDATE VENUE
router.put("/:id", middleware.checkVenueOwnership, function(req, res){
   geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newData = {name: req.body.name, image: req.body.image, location: location, lat: lat, lng: lng};
    Venue.findByIdAndUpdate(req.params.id, req.body.venue, function(err, venue){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/venues/" + venue._id);
        }
    });
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