'use strict';

angular.module('inmobiliariaApp')
  .factory('Unit', function ($resource) {
    return $resource('/api/unit/:id/:controller', {
      id: '@_id'
    },
    {
      update: {
        method:'PUT'
      },
      getBuildingUnits: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'units'
        }
      }
    });
  });
