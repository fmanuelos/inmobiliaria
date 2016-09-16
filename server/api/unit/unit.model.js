'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Unit
var unitSchema = new Schema({
  local:        { type: Number, required: true },
  surface:      { type: Number },
  type:         { type: String },
  description:  { type: String },
  ocupated:     { type: Boolean, default: true },
  created:      { type: Date, default: Date.now },
  createBy:    { type: String },
  building:     { type: Schema.Types.ObjectId, ref: 'Building' },
  contracts:    [{ type: Schema.Types.ObjectId, ref: 'Contract' }]
});

module.exports = mongoose.model('Unit', unitSchema);
