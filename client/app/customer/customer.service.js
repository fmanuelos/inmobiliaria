'use strict';

angular.module('inmobiliariaApp')
  .factory('Customer', function($resource) {
    return $resource('/api/customer/:id/:controller', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      getBuildingCustomers: {
        method: 'GET',
        isArray: true,
        params: {
          controller: 'customers'
        }
      },
    });
  });
