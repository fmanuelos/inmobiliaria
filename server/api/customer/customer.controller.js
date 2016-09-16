/**
 * GET     /customer              ->  index
 * POST    /customer              ->  create
 * GET     /customer/:id          ->  show
 * PUT     /customer/:id          ->  update
 * DELETE  /customer/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Customer = require('./customer.model');

// Get list of customers
exports.index = function(req, res) {
  Customer.find(function (err, customers) {
    if (err) return res.status(500).send(err);
    res.status(200).json(customers);
  });
};

// Creates a new customer
exports.create = function(req, res) {
  // req.assert('name', 'Invalid Name').notEmpty();
  // var err = req.validationErrors();
  // if(err) return res.status(400).json(err);

  Customer.create(req.body, function(err, customer) {
    if (err) return res.status(500).send(err);
    return res.status(201).json(customer);
  });
};

// Get a single customer
exports.show = function(req, res) {
  Customer
  .findById(req.params.id)
  .populate('building')
  .exec(function (err, customer) {
    if (err) return res.status(500).send(err);
    if(!customer) { return res.status(404).send('Not Found'); }
    return res.json(customer);
  });
};

// Updates an existing customer
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Customer.findById(req.params.id, function (err, customer) {
    if (err) return res.status(500).send(err);
    if(!customer) { return res.status(404).send('Not Found'); }
    var updated = _.merge(customer, req.body);
    updated.save(function (err) {
      if (err) return res.status(500).send(err);
      return res.status(200).json(customer);
    });
  });
};

// Deletes a customer
exports.destroy = function(req, res) {
  Customer.findById(req.params.id, function (err, customer) {
    if (err) return res.status(500).send(err);
    if(!customer) { return res.status(404).send('Not Found'); }
    customer.remove(function(err) {
      if (err) return res.status(500).send(err);
      return res.status(204).send('No Content');
    });
  });
};

// Get customers with building id with building
exports.getBuildingCustomers = function(req, res) {
  Customer.find({ building: req.params.building })
  .populate('building')
  .populate('contracts')
  .exec(function (err, customers) {
    if (err) return res.status(500).send(err);
    if(!customers) { return res.status(404).send('Not Found'); }
    res.status(200).json(customers);
  });
}
