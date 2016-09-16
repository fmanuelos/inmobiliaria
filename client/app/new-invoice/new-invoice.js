'use strict';

angular.module('inmobiliariaApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('new-invoice', {
        url: '/new-invoice',
        templateUrl: 'app/new-invoice/new-invoice.html',
        controller: 'NewInvoiceCtrl',
        authenticate: true
      });
  });
