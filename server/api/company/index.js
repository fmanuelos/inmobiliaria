'use strict';

var express = require('express');
var passport = require('passport');
var controller = require('./company.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:user/user', controller.getUserCompany);
router.get('/:id/users', controller.getCompanyUsers);
router.get('/:id/invoices', controller.getCompanyInvoices);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
