var mongoose = require('mongoose');
var Schema=mongoose.Schema;
const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/waiterApp";

mongoose.connect(mongoURL,{
  mongoUser:true
}),function(err) {
  if (err) {
    console.log('error connection');
  } else {
    console.log('database connection success');
  }
};

exports.waiterData = mongoose.model('waiterData',{
  username:String,
  days: {
    Sunday:Boolean,
    Monday : Boolean,
    Tuesday : Boolean,
    Wednesday:Boolean,
    Thursday:Boolean,
    Friday:Boolean,
    Saturday:Boolean
  }

});
