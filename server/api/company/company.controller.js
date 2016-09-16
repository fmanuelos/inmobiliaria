/**
 * GET     /company              ->  index
 * POST    /company              ->  create
 * GET     /company/:id          ->  show
 * PUT     /company/:id          ->  update
 * DELETE  /company/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Company = require('./company.model');

// Get list of companies
exports.index = function(req, res) {
  Company.find(function (err, companies) {
    if (err) return res.status(500).send(err);
    res.status(200).json(companies);
  });
};

// Creates a new company in the DB.
exports.create = function(req, res) {
  req.body.users = [];
  req.body.users.push(req.user._id);

  Company.create(req.body, function(err, company) {
    if (err) return res.status(500).send(err);
    return res.status(201).json(company);
  });
};

// Get a single company
exports.show = function(req, res) {
  Company
  .findById(req.params.id)
  .populate('buildings')
  .exec(function (err, company) {
    if (err) return res.status(500).send(err);
    if(!company) { return res.status(404).send('Not Found'); }
    return res.json(company);
  });
};

// Updates an existing company in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Company
  .findById(req.params.id)
  .populate('buildings')
  .exec(function (err, company) {
    if (err) return res.status(500).send(err);
    if(!company) { return res.status(404).send('Not Found'); }
    var updated = _.merge(company, req.body);
    updated.save(function (err) {
      if (err) return res.status(500).send(err);
      return res.status(200).json(company);
    });
  });
};

// Deletes a company from the DB.
exports.destroy = function(req, res) {
  Company.findById(req.params.id, function (err, company) {
    if (err) return res.status(500).send(err);
    if(!company) { return res.status(404).send('Not Found'); }
    company.remove(function(err) {
      if (err) return res.status(500).send(err);
      return res.status(204).send('No Content');
    });
  });
};

// Get a single company with user id
exports.getUserCompany = function(req, res) {
  Company.findOne({ users: { "$in" : [req.params.user]} })
    .populate('buildings')
    .exec(function (err, company) {
      if (err) return res.status(500).send(err);
      if(!company) { return res.status(404).send('Not Found'); }
      res.status(200).json(company);
  });
}

// Get a single company with invoices with id
exports.getCompanyUsers = function(req, res) {
  Company.findById(req.params.id)
    .populate('users')
    .exec(function (err, company) {
      if (err) return res.status(500).send(err);
      if(!company) { return res.status(404).send('Not Found'); }
      res.status(200).json(company);
  });
}

// Get a single company with invoices with id
exports.getCompanyInvoices = function(req, res) {
  Company.findById(req.params.id)
    .populate('invoices')
    .exec(function (err, company) {
      if (err) return res.status(500).send(err);
      if(!company) { return res.status(404).send('Not Found'); }
      res.status(200).json(company);
  });
}

