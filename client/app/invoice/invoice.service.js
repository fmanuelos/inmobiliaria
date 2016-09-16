'use strict';

angular.module('inmobiliariaApp')
  .factory('Invoice', function ($resource) {
    return $resource('/api/invoice/:id', {
      id: '@_id'
    },
    {
      update: {
        method:'PUT'
      }
    });
  });
