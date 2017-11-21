const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      State = require('./state');

//console.log(State);


const CustomerSchema = new Schema({
  suggestions   : { type : String, required: true, trim: true },
  subTitle    : { type : String, required: true, trim: true },
  isPreorder    : { type : String, required: true, trim: true },
  rating : { type : Number, required: true },
  reviews : { type : Number, required: true },

});

module.exports = mongoose.model('Customer', CustomerSchema, 'customers');
