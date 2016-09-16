'use strict';

angular.module('inmobiliariaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('contract', {
        url: '/contracts',
        templateUrl: 'app/contract/contract.html',
        controller: 'ContractCtrl',
        authenticate: true
      });
  });
