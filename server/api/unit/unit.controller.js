/**
 * GET     /unit              ->  index
 * POST    /unit              ->  create
 * GET     /unit/:id          ->  show
 * PUT     /unit/:id          ->  update
 * DELETE  /unit/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Unit = require('./unit.model');

// Get list of units
exports.index = function(req, res) {
  Unit.find(function (err, units) {
    if (err) return res.status(500).send(err);
    res.status(200).json(units);
  });
};

// Creates a new unit
exports.create = function(req, res) {
  // req.assert('name', 'Invalid Name').notEmpty();
  // var err = req.validationErrors();
  // if(err) return res.status(400).json(err);

  Unit.create(req.body, function(err, unit) {
    if (err) return res.status(500).send(err);
    return res.status(201).json(unit);
  });
};

// Get a single unit
exports.show = function(req, res) {
  Unit
  .findById(req.params.id)
  .populate('contracts')
  .exec(function (err, unit) {
    if (err) return res.status(500).send(err);
    if(!unit) { return res.status(404).send('Not Found'); }
    return res.json(unit);
  });
};

// Updates an existing unit
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Unit.findById(req.params.id, function (err, unit) {
    if (err) return res.status(500).send(err);
    if(!unit) { return res.status(404).send('Not Found'); }
    var updated = _.merge(unit, req.body);
    updated.save(function (err) {
      if (err) return res.status(500).send(err);
      return res.status(200).json(unit);
    });
  });
};

// Deletes a unit
exports.destroy = function(req, res) {
  Unit.findById(req.params.id, function (err, unit) {
    if (err) return res.status(500).send(err);
    if(!unit) { return res.status(404).send('Not Found'); }
    unit.remove(function(err) {
      if (err) return res.status(500).send(err);
      return res.status(204).send('No Content');
    });
  });
};

// Get units with building id with contract and customers
exports.getBuildingUnits = function(req, res) {
  Unit.find({ building: req.params.building })
  .populate('building')
  .exec(function (err, units) {
    if (err) return res.status(500).send(err);
    if(!units) { return res.status(404).send('Not Found'); }
    res.status(200).json(units);
  });
}
