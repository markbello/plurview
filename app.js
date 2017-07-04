var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    flash               = require("connect-flash"),
    Venue               = require("./models/venue"),
    Artist              = require("./models/artist"),
    Comment             = require("./models/comment"),
    User                = require("./models/user"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    FacebookStrategy    = require("passport-facebook"),
    methodOverride      = require("method-override");
    // seedDB              = require("./seeds");

var commentRoutes       = require("./routes/comments"),
    venueRoutes         = require("./routes/venues"),
    artistRoutes        = require("./routes/artists"),
    indexRoutes         = require("./routes/index");

var url = process.env.DATABASEURL || "mongodb://localhost/plurview";
mongoose.connect(url);

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require('moment');
// seedDB();

//PASSPORT CONFIGURATION    

app.use(require("express-session")({
    secret: "bender.killAllHumans()",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

var FACEBOOK_APP_ID = "266601703817544",
    FACEBOOK_APP_SECRET = "951428f343e4c062ceadc7b11bfcc136";
    
var fbOpts = {
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "https://plurview-markbello.c9users.io/auth/facebook/callback"
};

var fbCallback = function(accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
        User.findOne({"facebook.id": profile.id}, function(err, user){
            if(err)
                return done(err);
            if(user)
                return done(null, user);
            else {
                console.log(profile);
                var newUser = new User({facebookId: profile.id, facebookToken: accessToken, facebookDisplayName: profile.displayName});
                
                newUser.save(function(err){
                    if(err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });
    });
};

passport.use(new FacebookStrategy(fbOpts, fbCallback));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.route("/auth/facebook")
    .get(passport.authenticate("facebook"));

app.get("/auth/facebook/callback", 
    passport.authenticate("facebook", {successRedirect: "/profile", failureRedirect: "/"}));

// app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

// 	app.get('/auth/facebook/callback', 
// 	  passport.authenticate('facebook', { successRedirect: '/profile',
// 	                                      failureRedirect: '/' }));

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes, venueRoutes, artistRoutes);
app.use("/venues", venueRoutes);
app.use("/artists", artistRoutes);
app.use("/venues/:id/comments/", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("PLURview has started!");
});