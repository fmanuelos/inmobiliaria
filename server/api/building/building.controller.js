/**
 * GET     /building              ->  index
 * POST    /building              ->  create
 * GET     /building/:id          ->  show
 * PUT     /building/:id          ->  update
 * DELETE  /building/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Building = require('./building.model');

// Get list of buildings
exports.index = function(req, res) {
  Building.find(function (err, buildings) {
    if (err) return res.status(500).send(err);
    res.status(200).json(buildings);
  });
};

// Creates a new building in the DB.
exports.create = function(req, res) {
  Building.create(req.body, function (err, building) {
    if (err) return res.status(500).send(err);
    return res.status(201).json(building);
  });
};

// Get a single building
exports.show = function(req, res) {
  Building
  .findById(req.params.id)
  .populate('units')
  .populate('customers')
  .exec(function (err, building) {
    if (err) return res.status(500).send(err);
    if(!building) { return res.status(404).send('Not Found'); }
    return res.json(building);
  });
};

// Updates an existing building in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Building.findById(req.params.id, function (err, building) {
    if (err) return res.status(500).send(err);
    if(!building) { return res.status(404).send('Not Found'); }
    var updated = _.merge(building, req.body);
    updated.save(function (err) {
      if (err) return res.status(500).send(err);
      return res.status(200).json(building);
    });
  });
};

// Deletes a building from the DB.
exports.destroy = function(req, res) {
  Building.findById(req.params.id, function (err, building) {
    if (err) return res.status(500).send(err);
    if(!building) { return res.status(404).send('Not Found'); }
    building.remove(function (err) {
      if (err) return res.status(500).send(err);
      return res.status(204).send('No Content');
    });
  });
};

// Get a single building with company id
exports.getCompanyBuildings = function(req, res) {
    Building.find({ company: req.params.company }, function (err, buildings) {
    if (err) return res.status(500).send(err);
    if(!buildings) { return res.status(404).send('Not Found'); }
    res.status(200).json(buildings);
  });
}

// Get a building with id and populate contrant with customer
exports.getCompanyCustomers = function(req, res) {
  Building
  .find({ company: req.params.company })
  .populate('customers ')
  .exec(function (err, buildings) {
    if (err) return res.status(500).send(err);
    if(!buildings) { return res.status(404).send('Not Found'); }

    var options = [{
      path:   'customers.building',
      model:  'Building'
    }, {
      path:   'customers.contracts',
      model:  'Contract'
    }];

    Building.populate(buildings, options, function (err, buildings) {
      if (err) return res.status(500).send(err);
      res.status(200).json(buildings);
    });
  });
}

// Get a building with id and populate contrant with customer
exports.getCompanyUnits = function(req, res) {
  Building
  .find({ company: req.params.company })
  .populate('units')
  .exec(function (err, buildings) {
    if (err) return res.status(500).send(err);
    if(!buildings) { return res.status(404).send('Not Found'); }

    var options = {
      path:   'units.building',
      model:  'Building'
    };

    Building.populate(buildings, options, function (err, buildings) {
      if (err) return res.status(500).send(err);
      res.status(200).json(buildings);
    });
  });
}

// Get a building with id and populate contrant with customer
// exports.getBuildingContract = function(req, res) {
//   Building
//   .findById(req.params.id)
//   .populate('units')
//   .exec(function (err, building) {
//     if (err) return res.status(500).send(err);
//     if(!building) { return res.status(404).send('Not Found'); }

//     var options = {
//       path:   'units.contracts',
//       model:  'Contract'
//     };

//     Building.populate(building, options, function (err, building) {
//       if (err) return res.status(500).send(err);
//       return res.json(building);
//     });
//   });
// }

// // Get a building with id and populate customer with buildings
// exports.getBuildingCustomers = function(req, res) {
//   Building.findById(req.params.id)
//   .populate('customers')
//   .exec(function (err, buildings) {
//     if (err) return res.status(500).send(err);
//     if(!buildings) { return res.status(404).send('Not Found'); }

//     var options = {
//       path:   'customers.building',
//       model:  'Building'
//     };

//     Building.populate(buildings, options, function (err, building) {
//       if (err) return res.status(500).send(err);
//       res.status(200).json(building);
//     });
//   });
// }

// // Get a building with id and populate units with building
// exports.getBuildingUnits = function(req, res) {
//   Building
//   .findById(req.params.id)
//   .populate('units')
//   .exec(function (err, building) {
//     if (err) return res.status(500).send(err);
//     if(!building) { return res.status(404).send('Not Found'); }

//     var options = {
//       path:   'units.building',
//       model:  'Building'
//     };

//     Building.populate(building, options, function (err, building) {
//       if (err) return res.status(500).send(err);
//       res.status(200).json(building);
//     });
//   });
// }

// Get a building with id and populate units with building
exports.getCompanyContracts = function(req, res) {
  Building
  .find({ company: req.params.company })
  .populate('contracts')
  .exec(function (err, building) {
    if (err) return res.status(500).send(err);
    if(!building) { return res.status(404).send('Not Found'); }

    var options = [{
      path:   'contracts.customer',
      model:  'Customer'
    }, {
      path:   'contracts.building',
      model:  'Building'
    }];

    Building.populate(building, options, function (err, building) {
      if (err) return res.status(500).send(err);
        res.status(200).json(building);
    });
  });
}
