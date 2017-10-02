const express = require('express');
const exphbs = require("express-handlebars");
const form = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/greetings";
const Models = require("./models");

var app = express();
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 60000 * 30
    }
}));
app.use(flash());
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
app.post('/waiter/:username', function(req, res) {
  var username = req.params.username;
Mode.waiterData.find({}, function(err, results) {
  if (err) {
    return next(err)
  }else {

    res.render("home",{
      displayUsername: results
    })
  }
})

});

app.post('/waiter/:username', function(req, res) {
  var username = req.params.username;


    res.render("admin",{
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
