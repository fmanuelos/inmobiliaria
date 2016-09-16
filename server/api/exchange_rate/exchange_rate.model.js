'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Exchange Rate
var exchangeSchema = new Schema({
  date:   { type: Date },
  value:  { type: Number }
});

module.exports = mongoose.model('ExchangeRate', exchangeSchema);
