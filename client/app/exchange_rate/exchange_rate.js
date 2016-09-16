'use strict';

angular.module('inmobiliariaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('exchange_rate', {
        url: '/exchange-rates',
        templateUrl: 'app/exchange_rate/exchange_rate.html',
        controller: 'ExchangeRateCtrl',
        authenticate: true
      });
  });
