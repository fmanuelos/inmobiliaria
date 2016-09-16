'use strict';

angular.module('inmobiliariaApp')
  .factory('Building', function ($resource) {
    return $resource('/api/building/:id/:controller', {
      id: '@_id'
    },
    {
      update: {
        method:'PUT'
      },
      getCompanyBuildings: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'company'
        }
      },
      getCompanyContracts: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'contracts'
        }
      },
      getCompanyCustomers: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'customers'
        }
      },
      getCompanyUnits: {
        method: 'GET',
        isArray: true,
        params: {
          controller:'units'
        }
      },
      // getBuildingContract: {
      //   method: 'GET',
      //   params: {
      //     controller:'contract'
      //   }
      // },
      // getBuildingCustomers: {
      //   method: 'GET',
      //   params: {
      //     controller:'customers'
      //   }
      // },
      // getBuildingUnits: {
      //   method: 'GET',
      //   params: {
      //     controller:'units'
      //   }
      // },
    });
  });
