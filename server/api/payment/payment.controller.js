/**
 * GET     /payment              ->  index
 * POST    /payment              ->  create
 * GET     /payment/:id          ->  show
 * PUT     /payment/:id          ->  update
 * DELETE  /payment/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Payment = require('./payment.model');

// Get list of payments
exports.index = function(req, res) {
  Payment.find(function (err, payments) {
    if (err) return res.status(500).send(err);
    res.status(200).json(payments);
  });
};

// Creates a new payment in the DB.
exports.create = function(req, res) {

  Payment.create(req.body, function(err, payment) {
    if (err) return res.status(500).send(err);
    return res.status(201).json(payment);
  });
};

// Get a single payment
exports.show = function(req, res) {
  Payment.findById(req.params.id, function (err, payment) {
    if (err) return res.status(500).send(err);
    if(!payment) { return res.status(404).send('Not Found'); }
    return res.json(payment);
  });
};

// Updates an existing payment in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Payment.findById(req.params.id, function (err, payment) {
    if (err) return res.status(500).send(err);
    if(!payment) { return res.status(404).send('Not Found'); }
    var updated = _.merge(payment, req.body);
    updated.save(function (err) {
      if (err) return res.status(500).send(err);
      return res.status(200).json(payment);
    });
  });
};

// Deletes a payment from the DB.
exports.destroy = function(req, res) {
  Payment.findById(req.params.id, function (err, payment) {
    if (err) return res.status(500).send(err);
    if(!payment) { return res.status(404).send('Not Found'); }
    payment.remove(function(err) {
      if (err) return res.status(500).send(err);
      return res.status(204).send('No Content');
    });
  });
};
