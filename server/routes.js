/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/bank_account', require('./api/bank_account'));
  app.use('/api/company', require('./api/company'));
  app.use('/api/building', require('./api/building'));
  app.use('/api/contract', require('./api/contract'));
  app.use('/api/customer', require('./api/customer'));
  app.use('/api/exchange_rate', require('./api/exchange_rate'));
  app.use('/api/invoice', require('./api/invoice'));
  app.use('/api/payment', require('./api/payment'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/unit', require('./api/unit'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
