var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("venues"),
    function(req, res) {
        var venues = [
            { name: "Webster Hall", image: "http://www.websterhall.com/redesign/wp-content/uploads/mdicon.jpg" } { name: "Playstation Theater", image: "http://mattybraps.com/wp-content/uploads/2016/03/playstation-theater.jpg" } { name: "Atlantic Avenue Warehouse", image: "http://www.thenocturnaltimes.com/wp-content/uploads/2017/04/anjuna-nyc-2.jpg" }
        ]

        res.render("venues");
    }

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("PLURview has started!");
});