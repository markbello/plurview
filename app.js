var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    res.render("landing");
});

var venues = [
    { name: "Webster Hall", image: "http://www.websterhall.com/redesign/wp-content/uploads/mdicon.jpg" }, { name: "Playstation Theater", image: "http://mattybraps.com/wp-content/uploads/2016/03/playstation-theater.jpg" }, { name: "Atlantic Avenue Warehouse", image: "http://www.thenocturnaltimes.com/wp-content/uploads/2017/04/anjuna-nyc-2.jpg" }
];

app.get("/venues", function(req, res) {

    res.render("venues", { venues: venues });
});

app.post("/venues", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newVenue = { name: name, image: image };
    venues.push(newVenue);
    res.redirect("/venues");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("PLURview has started!");
});