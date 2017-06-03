
var Comment = require("../models/comment");
var Venue = require("../models/venue");

var middlewareObj = {};

middlewareObj.checkVenueOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Venue.findById(req.params.id, function(err, foundVenue){
            if(err){
                req.flash("error", "Venue not found");
                res.redirect("back");
            } else{
                if(foundVenue.author.id.equals(req.user._id)) {
                    next();
                } else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else{
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else{
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("success", "You need to be logged in to do that!");
    res.redirect("/login");
};

module.exports = middlewareObj;