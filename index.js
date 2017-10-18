const express = require('express');
const exphbs = require("express-handlebars");
const form = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/waiterApp";
const Models = require("./models");
const models = Models(mongoURL);

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 60000 * 30
    }
}));
app.use(flash());

// setting rendering engine
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

app.get("/waiter/:username", function(req, res) {
    var username = req.params.username;
    message = "Hello and welcome, " + username + " can you please select your working days ";
    res.render("home", {
        message: message
    })
});

app.post("/waiter/:username", function(req, res) {
    var username = req.params.username;
    var daysToWork = req.body.days;
    var workingDays = {};
    var messageUpdateShifts = username +","+ " your shifts are  successfully added";


if (!Array.isArray(daysToWork)) {
  daysToWork= [daysToWork]
}
daysToWork.forEach(function(results) {
  workingDays[results] = true;
})

    models.waiterData.findOneAndUpdate({
        name: username
    }, {
        days: workingDays
    }, function(err, results) {
        if (err) {
            console.log(err);
        }else{
        if (results) {
          var data = {
            name: results.username,
            days: results.workingDays
          }
          res.render('home', data)
        }
      }
            if (!results) {
                models.waiterData.create({
                    name: username,
                    days: daysToWork

                }, function(err, results) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.render("home", {
                            alertShifts: messageUpdateShifts
                        })
                    }
                });

            }


    })
daysToWork.forEach(function(day){
workingDays[day]=true;
});
});

function colorForDays(daysColor) {
    if (daysColor === 3) {
        return "color1";
    }
    if (daysColor > 3) {
        return "color2";
    }
    if (daysColor < 3) {
        return "color3";
    }
}

app.get('/admin', function(req, res) {
    models.waiterData.find({}, function(err, results) {

        if (err) {
            console.log(err);
        }
        var sunday = [];
        var monday = [];
        var tuesday = [];
        var wednesday = [];
        var thursday = [];
        var friday = [];
        var saturday = [];

        // results.forEach(function(dayOutcome) {
        //     var day = dayOutcome.days;

            // var names = dayOutcome.name;
            // console.log(names);

            for (var i = 0; i < results.length; i++) {
                var storedWaiterDays = results[i].days;
                for(var storedWaiterDays in storedWaiterDays)
                if (storedWaiterDays === "sunday") {
                    sunday.push(results[i].name);

                }
                if (storedWaiterDays === "monday") {
                    monday.push(results[i].name);
                }
                if (storedWaiterDays === "tuesday") {
                    tuesday.push(results[i].name)
                }
                if (storedWaiterDays === "wednesday") {
                    wednesday.push(results[i].name)
                }
                if (storedWaiterDays === "thursday") {
                    thursday.push(results[i].name)
                }
                if (storedWaiterDays === "friday") {
                    friday.push(results[i].name)
                }
                if (storedWaiterDays === "saturday") {
                    saturday.push(results[i].name)

                }

            // }

        }

        res.render("admin", {
            day1: sunday,
            color1: colorForDays(sunday.length),

            day2: monday,
            color2: colorForDays(monday.length),

            day3: tuesday,
            color3: colorForDays(tuesday.length),

            day4: wednesday,
            color4: colorForDays(wednesday.length),

            day5: thursday,
            color5: colorForDays(thursday.length),

            day6: friday,
            color6: colorForDays(friday.length),

            day7: saturday,
            color7: colorForDays(saturday.length)
        })
    });
});

app.post("/reset", function(req, res) {
    models.waiterData.remove({}, function(err, results) {
        if (err) {
            console.log(err);


        }
        res.render("admin")
    });
});

app.set('port', (process.env.PORT || 5000));

app.use(function(err, req, res, next) {
    res.status(500).send(err.stack)
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port' + app.get('port'));

});
