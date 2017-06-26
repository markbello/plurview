var mongoose = require("mongoose");

var venueSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    // address: String,
    location: String,
    lat: Number,
    lng: Number,
    lastUpdated: { type: Date, default: Date.now },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }]
});

module.exports = mongoose.model("Venue", venueSchema);