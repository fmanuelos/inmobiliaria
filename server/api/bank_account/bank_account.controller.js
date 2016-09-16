/**
 * GET     /bank_account              ->  index
 * POST    /bank_account              ->  create
 * GET     /bank_account/:id          ->  show
 * PUT     /bank_account/:id          ->  update
 * DELETE  /bank_account/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var BankAccount = require('./bank_account.model');

// Get list of bank_accounts
exports.index = function(req, res) {
  BankAccount.find(function (err, bank_accounts) {
    if (err) return res.status(500).send(err);
    res.status(200).json(bank_accounts);
  });
};

// Creates a new bank_account
exports.create = function(req, res) {
  // req.assert('name', 'Invalid Name').notEmpty();
  // var err = req.validationErrors();
  // if(err) return res.status(400).json(err);

  BankAccount.create(req.body, function(err, bank_account) {
    if (err) return res.status(500).send(err);
    return res.status(201).json(bank_account);
  });
};

// Get a single bank_account
exports.show = function(req, res) {
  BankAccount.findById(req.params.id, function (err, bank_account) {
    if (err) return res.status(500).send(err);
    if(!bank_account) { return res.status(404).send('Not Found'); }
    return res.json(bank_account);
  });
};

// Updates an existing bank_account
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  BankAccount.findById(req.params.id, function (err, bank_account) {
    if (err) return res.status(500).send(err);
    if(!bank_account) { return res.status(404).send('Not Found'); }
    var updated = _.merge(bank_account, req.body);
    updated.save(function (err) {
      if (err) return res.status(500).send(err);
      return res.status(200).json(bank_account);
    });
  });
};

// Deletes a bank_account
exports.destroy = function(req, res) {
  BankAccount.findById(req.params.id, function (err, bank_account) {
    if (err) return res.status(500).send(err);
    if(!bank_account) { return res.status(404).send('Not Found'); }
    bank_account.remove(function(err) {
      if (err) return res.status(500).send(err);
      return res.status(204).send('No Content');
    });
  });
};
