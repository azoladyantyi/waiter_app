const exphbs = require("express-handlebars");
const form = require('body-parser');
var express = require('express');
const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/waiterApp";
const models = require("./models");


var app = express();
var app = express();

app.engine("handlebars", exphbs({
    defaultLayout: "main",
    extname: "handlebars"
}));
app.use(express.static("public"));
app.use(express.static("views"))
app.use(form.urlencoded({
    extended: true
}));
app.set("view engine", "handlebars")

app.get("/", function(req, res) {
    res.render("home");
});

app.get('/waiter/:username', function(req, res) {
  var username = req.params.username;
    res.render("home",{

    })
});

// POST method route
app.post('/waiter/:username', function(req, res) {
    res.render('homer', {
displayUsername: username
    })
});


app.get('/days', function(req, res) {

});
//start the server
var server = app.listen(3000, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
