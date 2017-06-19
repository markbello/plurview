var mongoose    = require("mongoose"),
    Venue       = require("./models/venue"),
    Artist      = require("./models/artist");

var venueData = [
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

var artistData = [
    {
        name: "Hardwell",
        logo: "https://s3.amazonaws.com/cdn.designcrowd.com/blog/22-Logo-Designs-from-the-Worlds-Most-Popular-DJs/hardwell-logo-design.jpg",
        blurb: "Hardwell is one of the world's leading mainstage DJs. He plays a lot of bass house type of music with sick bass drops that will get you jumping all night. Great visuals, including pyrotechnics."
    },
    {
        name: "Deorro",
        logo: "http://static1.squarespace.com/static/57744fb7579fb3507cb8f545/t/577479eed2b8573ac107f41b/1467251183488/unspecified.png?format=1000w",
        blurb: "Deorro's bass drops get the crowd bouncing. Dope visuals- often more on the funny side."
    },
    {
        name: "Excision",
        image: "http://www.dafont.com/forum/attach/orig/7/8/78071.gif?1",
        blurb: "Excision could be God's (or the devil's?) gift to dubstep. You'll find a hardcore fanbase, many of whom wear Excision-branded neck braces for headbanging so hard. Easily the most immersive visuals of any EDM artist."
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
    
    Artist.remove({}, function(err){
        if(err){
            console.log(err);
        } else{
        console.log("Removed artists!");
        }
    });
}

module.exports = seedDB;

// venueData.forEach(function(seed){
//     Venue.create(seed,function(err, venue){
//         if(err){
//             console.log(err);
//         } else{
//             console.log("added a venue");
//             // Comment.create(
//             //     {
//             //         text: "This place was great, there were too many people!", author: "Mark"
//             //     }, function(err, comment){
//             //         if(err){
//             //             console.log(err);
//             //         } else{
//             //             venue.comments.push(comment);
//             //             venue.save();
//             //             console.log("Created new comment");
//             //         }
//             //     }
//             // );
//         }
//     });
// });

// artistData.forEach(function(seed){
//     Artist.create(seed,function(err, venue){
//         if(err){
//             console.log(err);
//         } else{
//             console.log("added an artist");
//             // Comment.create(
//             //     {
//             //         text: "This place was great, there were too many people!", author: "Mark"
//             //     }, function(err, comment){
//             //         if(err){
//             //             console.log(err);
//             //         } else{
//             //             venue.comments.push(comment);
//             //             venue.save();
//             //             console.log("Created new comment");
//             //         }
//             //     }
//             // );
//         }
//     });
// });