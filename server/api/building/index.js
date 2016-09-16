'use strict';

var express = require('express');
var passport = require('passport');
var controller = require('./building.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:company/company', controller.getCompanyBuildings);
router.get('/:company/contracts', controller.getCompanyContracts);
router.get('/:company/customers', controller.getCompanyCustomers);
router.get('/:company/units', controller.getCompanyUnits);
// router.get('/:id/contract', controller.getBuildingContract);
// router.get('/:id/customers', controller.getBuildingCustomers);
// router.get('/:id/units', controller.getBuildingUnits);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
