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
      displayUsername: username
    })
});


app.get('/admin', function (req, res) {
  res.render('admin', {});
});

//start the server
app.set('port', (process.env.PORT || 5000));

app.use(function(err, req, res, next) {
    res.status(500).send(err.stack)
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port' + app.get('port'));

});
