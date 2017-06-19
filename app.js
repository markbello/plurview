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
    seedDB              = require("./seeds");

var commentRoutes       = require("./routes/comments"),
    venueRoutes         = require("./routes/venues"),
    artistRoutes        = require("./routes/artists"),
    indexRoutes         = require("./routes/index");

// mongoose.connect(process.env.DATABASEURL);
mongoose.connect("mongodb://localhost/plurview");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

//PASSPORT CONFIGURATION    

app.use(require("express-session")({
    secret: "bender.killAllHumans()",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/venues", venueRoutes);
app.use("/artists", artistRoutes);
app.use("/venues/:id/comments/", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("PLURview has started!");
});