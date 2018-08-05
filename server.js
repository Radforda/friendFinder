// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var friends=require("./app/data/friends");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT ||3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
path.join(__dirname, 'public');


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/survey.html"));
});

// Displays all characters
app.get("/api/friends", function(req, res) {

        console.log(friends);
        return res.json(friends);
    
});


var find=function (friends, survey){
    var total=0;
    var best=1000;
    var match;
    console.log(friends);
  for (var i=0; i< friends.length; i++){
      total=0;
      for(var j=0; j<10 ;j++){
        total+=Math.abs(friends[i].scores[j] -survey[j]);
      }
      if(total<best){
          best=total;
          match=friends[i];
          console.log("best: "+best+"  match: "+match)
      }
  }
  console.log(match);
  return match;
}
// Create New Characters - takes in JSON input
app.post("/api/friends", function(req, res) {
  var survey = req.body.questions;
//find most compatible friend

  console.log(survey);
  var match=find(friends, survey);
  
  res.json(match);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
