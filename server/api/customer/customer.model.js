'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Movement
var ContactSchema = new Schema({
  name:        { type: String },
  email:       { type: String },
  phone:       { type: String },
  position:    { type: String },
  isActive:    { type: Boolean }
});

// Customer
var customerSchema = new Schema({
  name:           { type: String, required: true },
  tradename:      { type: String },
  rfc:            { type: String },
  address:        { type: String },
  neiborhood:     { type: String },
  zipCode:        { type: String },
  city:           { type: String },
  state:          { type: String },
  country:        { type: String },
  representative: { type: String },
  email:          { type: String },
  currency:       { type: String, lowercase: true },
  contacts:       [ContactSchema],
  isActive:      { type: Boolean },
  createBy:      { type: String },
  created:        { type: Date, default: Date.now },
  building:       { type: Schema.Types.ObjectId, ref: 'Building' },
  contracts:      [{ type: Schema.Types.ObjectId, ref: 'Contract' }]
});

module.exports = mongoose.model('Customer', customerSchema);
