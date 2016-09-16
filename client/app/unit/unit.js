'use strict';

angular.module('inmobiliariaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('unit', {
        url: '/units',
        templateUrl: 'app/unit/unit.html',
        controller: 'UnitCtrl',
        authenticate: true
      });
  });
