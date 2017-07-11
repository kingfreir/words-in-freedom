var express = require('express');
var router = express.Router();

var test = [{
    "name" : "Beginnings",
    "content" : [
        "We have been up all night, my friends and I",
        "We declare our intentions",
        "We will sing of",
        "X, Y and Z will be the essential elements of our movement",
        "Up to now",
        "For too long",
        "We intend to exalt",
        "We affirm",
        "We will glorify",
        "We will destroy",
        "We will fight",
        "With this manifesto we establish X",
        "We intend to free X from Y",
        "We want no part of it",
        "They will come against us",
        "You have objections? We know them!",
        "Lift up your heads!",
        "We only want",
        "Today",
        "Tomorrow",
        "Do not",
        "We devote ourselves to",
        "We hold these truths to be self-evident",
        "Let the facts speak",
        "We, therefore",
        "We pledge",
        "We vow",
        "We proclaim",
        "Let each of us proclaim",
        "Blast",
        "Bless",
        "Curse",
        "Down with",
        "Up with",
        "We believe in",
        "No more",
        "Never again",
        "Finally",
        "Stop",
        "The time has come",
        "What we want",
        "We believe",
        "At this moment"
    ]
}]

router.get('/',function(req,res){
  res.render('index',{categories:test});
});

module.exports = router;
