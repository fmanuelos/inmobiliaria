/**
 * GET     /contract              ->  index
 * POST    /contract              ->  create
 * GET     /contract/:id          ->  show
 * PUT     /contract/:id          ->  update
 * DELETE  /contract/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Contract = require('./contract.model');

// Get list of contracts
exports.index = function(req, res) {
  Contract.find(function (err, contracts) {
    if (err) return res.status(500).send(err);
    res.status(200).json(contracts);
  });
};

// Creates a new contract
exports.create = function(req, res) {
  // req.assert('name', 'Invalid Name').notEmpty();
  // var err = req.validationErrors();
  // if(err) return res.status(400).json(err);

  Contract.create(req.body, function(err, contract) {
    if (err) return res.status(500).send(err);
    return res.status(201).json(contract);
  });
};

// Get a single contract
exports.show = function(req, res) {
  Contract.findById(req.params.id)
  .populate('building')
  .populate('unit')
  .populate('customer')
  .exec(function (err, contract) {
    if (err) return res.status(500).send(err);
    if(!contract) { return res.status(404).send('Not Found'); }
    return res.json(contract);
  });
};

// Updates an existing contract
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Contract.findById(req.params.id, function (err, contract) {
    if (err) return res.status(500).send(err);
    if(!contract) { return res.status(404).send('Not Found'); }
    var updated = _.merge(contract, req.body);
    updated.save(function (err) {
      if (err) return res.status(500).send(err);
      return res.status(200).json(contract);
    });
  });
};

// Deletes a contract
exports.destroy = function(req, res) {
  Contract.findById(req.params.id, function (err, contract) {
    if (err) return res.status(500).send(err);
    if(!contract) { return res.status(404).send('Not Found'); }
    contract.remove(function(err) {
      if (err) return res.status(500).send(err);
      return res.status(204).send('No Content');
    });
  });
};

// Get contracts with building id with building
exports.getBuildingContracts = function(req, res) {
  Contract.find({ building: req.params.building })
  .populate('building')
  .populate('customer')
  .exec(function (err, contracts) {
    if (err) return res.status(500).send(err);
    if(!contracts) { return res.status(404).send('Not Found'); }
    res.status(200).json(contracts);
  });
}
