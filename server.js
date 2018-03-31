var express = require('express');

//instantiate Express
var app = express();

app.use(express.static(__dirname + '/'));

app.use(function(req, res) {
    res.sendFile(__dirname + '/index.html')
  });
  

//Set up REST responses
app.get('/', function(req, res){
  res.send('Hello from Express!');
});

//Start the server
app.listen(3000, function(){
  console.log("Express running on port 3000.");
});

