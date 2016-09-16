/**
 * GET     /invoice              ->  index
 * POST    /invoice              ->  create
 * GET     /invoice/:id          ->  show
 * PUT     /invoice/:id          ->  update
 * DELETE  /invoice/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Invoice = require('./invoice.model');

// Get list of invoices
exports.index = function(req, res) {
  Invoice.find(function (err, invoices) {
    if (err) return res.status(500).send(err);
    res.status(200).json(invoices);
  });
};

// Creates a new invoice
exports.create = function(req, res) {
  // req.assert('serie', 'Invalid Serie').notEmpty();
  // req.assert('folio', 'Invalid Folio').notEmpty();
  // var err = req.validationErrors();
  // if(err) return res.status(400).json(err);

  Invoice.create(req.body, function(err, invoice) {
    if (err) return res.status(500).send(err);
    return res.status(201).json(invoice);
  });
};

// Get a single invoice
exports.show = function(req, res) {
  Invoice.findById(req.params.id, function (err, invoice) {
    if (err) return res.status(500).send(err);
    if(!invoice) { return res.status(404).send('Not Found'); }
    return res.json(invoice);
  });
};

// Updates an existing invoice
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Invoice.findById(req.params.id, function (err, invoice) {
    if (err) return res.status(500).send(err);
    if(!invoice) { return res.status(404).send('Not Found'); }
    var updated = _.merge(invoice, req.body);
    updated.save(function (err) {
      if (err) return res.status(500).send(err);
      return res.status(200).json(invoice);
    });
  });
};

// Deletes a invoice
exports.destroy = function(req, res) {
  Invoice.findById(req.params.id, function (err, invoice) {
    if (err) return res.status(500).send(err);
    if(!invoice) { return res.status(404).send('Not Found'); }
    invoice.remove(function(err) {
      if (err) return res.status(500).send(err);
      return res.status(204).send('No Content');
    });
  });
};
