'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

// Contract
var contractSchema = new Schema({
  name:              { type: String },
  notes:             { type: String },
  startDate:         { type: Date },
  endDate:           { type: Date },
  monthlyRent:       { type: Currency },
  taxRate:           { type: Number },
  currency:          { type: String, lowercase: true },
  paymentMethod:     { type: String },
  deposit:           { type: Currency },
  guarantee:         { type: String },
  maintenanceFee:    { type: Currency },
  taxOverdue:        { type: Currency },
  marginsDay:        { type: Number },
  // payment_method:    { type: String },
  // payment_type:      { type: String },
  // payment_condition: { type: String },
  // payment_account:   { type: String },
  // account_number:    { type: String },
  // account_revenue:   { type: String },
  isActive:         { type: Boolean },
  createBy:         { type: String },
  created:           { type: Date, default: Date.now },
  invonces:          [{ type: Schema.Types.ObjectId, ref: 'Invonce' }],
  building:          { type: Schema.Types.ObjectId, ref: 'Building' },
  unit:              { type: Schema.Types.ObjectId, ref: 'Unit' },
  customer:          { type: Schema.Types.ObjectId, ref: 'Customer' }
});

module.exports = mongoose.model('Contract', contractSchema);
