'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Company
var companySchema = new Schema({
  name:       { type: String, required: true },
  create_by:  { type: String },
  created:    { type: Date, default: Date.now },
  buildings:  [{ type: Schema.Types.ObjectId, ref: 'Building' }],
  invoices:   [{ type: Schema.Types.ObjectId, ref: 'Invoice' }],
  users:      [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Company', companySchema);
