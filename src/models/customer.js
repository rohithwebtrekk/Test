const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      State = require('./state');

//console.log(State);
const OrderSchema = new Schema({
  product  : { type : String, required: true, trim: true },
  price    : { type : Number },
  quantity : { type : Number }
});

const CustomerSchema = new Schema({
  firstName   : { type : String, required: true, trim: true },
  lastName    : { type : String, required: true, trim: true },
  stateId     : { type : Number, required: true },
  birthday    : { type : Date, required: true },
  lastContact : { type : Date, required: true },
  state       : State.schema ,
  gender      : { type : String },
  orderCount  : {  type : Number },
  orders      : [ OrderSchema ],
});

module.exports = mongoose.model('Customer', CustomerSchema, 'customers');
