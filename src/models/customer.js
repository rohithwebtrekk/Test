const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      State = require('./state');

//console.log(State);


const CustomerSchema = new Schema({
  firstName   : { type : String, required: true, trim: true },
  lastName    : { type : String, required: true, trim: true },
  birthday    : { type : Date, required: true },
  lastContact : { type : Date, required: true },
  customerLifeTimeValue : { type : Number, required: true },
  gender      : { type : String },

});

module.exports = mongoose.model('Customer', CustomerSchema, 'customers');
