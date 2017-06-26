var mongoose = require("mongoose");

var artistSchema = new mongoose.Schema({
    name: String,
    logo: String,
    blurb: String,
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

module.exports = mongoose.model("Artist", artistSchema);