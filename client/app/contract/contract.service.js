'use strict';

angular.module('inmobiliariaApp')
  .factory('Contract', function ($resource) {
    return $resource('/api/contract/:id/:controller', {
      id: '@_id'
    },
    {
      update: {
        method:'PUT'
      },
      getBuildingContracts: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'contracts'
        }
      },
    });
  });
