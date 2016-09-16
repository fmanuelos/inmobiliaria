'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Payment
var paymentSchema = new Schema({
  amount:            { type: Number },
  comment:           { type: String },
  currency:          { type: String, lowercase: true },
  exchangeAmount:    { type: String },
  exchangeNetGain:   { type: String },
  referenceNumber:   { type: String },
  paymentDate:       { type: Date },
  createBy:          { type: String },
  created:           { type: Date, default: Date.now },
  invonce:           { type: Schema.Types.ObjectId, ref: 'Invoice' },
  bank_account:      { type: Schema.Types.ObjectId, ref: 'BankAccount' }
});

module.exports = mongoose.model('Payment', paymentSchema);
