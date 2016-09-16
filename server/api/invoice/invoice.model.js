'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var Company = require('../company/company.model');

// Movement
var movementSchema = new Schema({
  quantity:    { type: Number },
  concept:     { type: String },
  amount:      { type: Number },
  tax:         { type: Number },
  total:       { type: Number }
});

// Invoice
var invoiceSchema = new Schema({
  serie:       { type: String },
  folio:       { type: String },
  amount:      { type: Number },
  tax:         { type: Number },
  total:       { type: Number },
  seal_date:   { type: Date },
  cancel_date: { type: Date },
  currency:    { type: String },
  uudi:        { type: String },
  create_by:   { type: String },
  created:     { type: Date, default: Date.now },
  movements:   [movementSchema],
  payments:    [{ type: Schema.Types.ObjectId, ref: 'Payment' }],
  company:     { type: Schema.Types.ObjectId, ref: 'Company' },
  customer:    { type: Schema.Types.ObjectId, ref: 'Customer' },
  contract:    { type: Schema.Types.ObjectId, ref: 'Contract' }
});

// invoiceSchema.pre('save', function(next) {
//   console.log('factura');
//   var doc = this;

//   Company.findById(doc.company, function (err, company) {
//     if (err) return next(err);

//     var lastInvoiceId = company.invoices[company.invoices.length - 1];

//     Invoice.findById(lastInvoiceId, function (err, invoice) {
//       if (err) return next(err);
//       invoice.
//     });

//     //if(!contract) { return res.status(404).send('Not Found'); }
//     //return res.json(contract);
//     next();
//   });
//   // do stuff
//   //next();
// });


var Invoice = mongoose.model('Invoice', invoiceSchema);

invoiceSchema.pre('save', function(next) {
  var doc = this;

  Company.findById(doc.company, function (err, company) {

    if (err) return next(err);
    if (!company) return next();
    if (company.invoices.length == 0) return next();

    var lastInvoiceId = company.invoices[company.invoices.length - 1];

    Invoice.findById(lastInvoiceId, function (err, invoice) {
      if (err) return next(err);
      doc.folio  = parseInt(invoice.folio) + 1;
      console.log(doc.folio);
      next();
    });
  });
  // do stuff
  next();
});

module.exports = Invoice;
