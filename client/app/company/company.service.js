'use strict';

angular.module('inmobiliariaApp')
  .factory('Company', function ($resource) {
    return $resource('/api/company/:id/:controller', {
      id: '@_id'
    },
    {
      update: {
        method:'PUT'
      },
      getUserCompany: {
        method: 'GET',
        params: {
          controller:'user'
        }
      },
      getCompanyUsers: {
        method: 'GET',
        params: {
          controller:'users'
        }
      },
      getCompanyInvoices: {
        method: 'GET',
        params: {
          controller:'invoices'
        }
      },
    });
  });
