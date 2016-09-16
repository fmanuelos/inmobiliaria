'use strict';

angular.module('inmobiliariaApp')
  .controller('ExchangeRateCtrl', function ($scope, ExchangeRate) {

    var now       = new Date();
    var firstDay  = new Date(now.getFullYear(), now.getMonth(), 1);
    var lastDay   = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23);

    $scope.exchange = {};

    ExchangeRate.query({date_start: firstDay, date_end: lastDay }).$promise.then( function(exchangeRates){
      $scope.exchangeRates = exchangeRates;
    });

    $scope.filter = function(exchange) {
      if(exchange.startDate === undefined || exchange.endDate === undefined){
        return;
      }

      ExchangeRate.query({date_start: exchange.startDate, date_end: exchange.endDate.setHours(23) }).$promise.then( function(exchangeRates){
        $scope.exchangeRates = exchangeRates;
      });
    };

  });
