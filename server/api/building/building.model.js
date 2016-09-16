'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Building
var buildingSchema = new Schema({
  name:       { type: String, required: true },
  createBy:  	{ type: String },
  created:    { type: Date, default: Date.now },
  company:    { type: Schema.Types.ObjectId, ref: 'Company' },
  contracts:  [{ type: Schema.Types.ObjectId, ref: 'Contract' }],
  customers:  [{ type: Schema.Types.ObjectId, ref: 'Customer' }],
  units:      [{ type: Schema.Types.ObjectId, ref: 'Unit' }]
});

module.exports = mongoose.model('Building', buildingSchema);
