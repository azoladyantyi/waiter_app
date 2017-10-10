const mongoose = require('mongoose');

const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/waiterApp";

mongoose.connect(mongoURL, {
  useMongoClient: true
},function(error) {

});

module.exports = function () {
  const waiterSchema = mongoose.Schema({
    name: String,
    days: Object
  })
  waiterSchema.index({name: 1}, {unique: true})
  const waiterData = mongoose.model("waiterData", waiterSchema)

  return {
    waiterData
  }
}
