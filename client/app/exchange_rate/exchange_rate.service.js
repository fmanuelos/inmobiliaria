'use strict';

angular.module('inmobiliariaApp')
  .factory('ExchangeRate', function ($resource) {
    return $resource('/api/exchange_rate/:id', {
      id: '@_id'
    },
    {
      update: {
        method:'PUT'
      }
    });
  });
