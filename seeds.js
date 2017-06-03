var mongoose    = require("mongoose"),
    Venue       = require("./models/venue"),
    Comment     = require("./models/comment");

var data = [
    {
        name: "Webster Hall",
        image: "http://clubsinnyc.com/clubadmin/uploads/images/489_12162015234334.jpg",
        address: "125 E 11th St, New York, NY 10003"
    },
    {
        name: "Playstation Theater",
        image: "https://i.axs.com/2015/10/playstation-theater_new-york_10-02-15_14_560ee2da3e576.jpg",
        address: "1515 Broadway, New York, NY 10036"
    },
    {
        name: "Atlantic Avenue Warehouse",
        image: "http://www.thenocturnaltimes.com/wp-content/uploads/2017/04/anjuna-nyc-2.jpg",
        address: "1260 Atlantic Ave, Brooklyn, NY, 11216"
    },
    ];
    
function seedDB(){
    Venue.remove({}, function(err){
        if(err){
            console.log(err);
        } else{
        console.log("Removed venues!");
        }
    });
}

module.exports = seedDB;

//     // data.forEach(function(seed){
//     //     Venue.create(seed,function(err, venue){
//     //         if(err){
//     //             console.log(err);
//     //         } else{
//     //             console.log("added a venue");
//     //             Comment.create(
//     //                 {
//     //                     text: "This place was great, there were too many people!", author: "Mark"
//     //                 }, function(err, comment){
//     //                     if(err){
//     //                         console.log(err);
//     //                     } else{
//     //                         venue.comments.push(comment);
//     //                         venue.save();
//     //                         console.log("Created new comment");
//     //                     }
//     //                 }
//     //             );
//     //         }
//     //     });
//     // });