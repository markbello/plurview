var mongoose = require("mongoose");

var venueSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    address: String,
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