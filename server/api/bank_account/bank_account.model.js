'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Bank Account
var bankSchema = new Schema({
  name:     { type: String },
  number:   { type: Number },
  currency: { type: String, lowercase: true },
  account:  { type: String },
  isActive: { type: String },
  createBy: { type: String },
  created:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('BankAccount', bankSchema);
