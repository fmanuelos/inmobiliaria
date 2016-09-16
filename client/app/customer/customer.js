'use strict';

angular.module('inmobiliariaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('customer', {
        url: '/customers',
        templateUrl: 'app/customer/customer.html',
        controller: 'CustomerCtrl',
        authenticate: true
      });
  });
