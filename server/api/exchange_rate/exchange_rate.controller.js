/**
 * GET     /exchange_rate              ->  index
 * POST    /exchange_rate              ->  create
 * GET     /exchange_rate/:id          ->  show
 * PUT     /exchange_rate/:id          ->  update
 * DELETE  /exchange_rate/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var ExchangeRate = require('./exchange_rate.model');

// Get list of exchange_rates
exports.index = function(req, res) {
  ExchangeRate.find({ date: { $gte: req.query.date_start, $lte: req.query.date_end }}, function (err, exchange_rates) {
    if (err) return res.status(500).send(err);
    res.status(200).json(exchange_rates);
  });
};

//Creates a new exchange_rate in the DB.
exports.create = function(req, res) {
  ExchangeRate.create(req.body, function(err, exchange_rate) {
    if (err) return res.status(500).send(err);
    return res.status(201).json(exchange_rate);
  });
};

// Get a single exchange_rate
exports.show = function(req, res) {
  ExchangeRate.findById(req.params.id, function (err, exchange_rate) {
    if (err) return res.status(500).send(err);
    if(!exchange_rate) { return res.status(404).send('Not Found'); }
    return res.json(exchange_rate);
  });
};

// Updates an existing exchange_rate in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  ExchangeRate.findById(req.params.id, function (err, exchange_rate) {
    if (err) return res.status(500).send(err);
    if(!exchange_rate) { return res.status(404).send('Not Found'); }
    var updated = _.merge(exchange_rate, req.body);
    updated.save(function (err) {
      if (err) return res.status(500).send(err);
      return res.status(200).json(exchange_rate);
    });
  });
};

// Deletes a exchange_rate from the DB.
exports.destroy = function(req, res) {
  ExchangeRate.findById(req.params.id, function (err, exchange_rate) {
    if (err) return res.status(500).send(err);
    if(!exchange_rate) { return res.status(404).send('Not Found'); }
    exchange_rate.remove(function(err) {
      if (err) return res.status(500).send(err);
      return res.status(204).send('No Content');
    });
  });
};
