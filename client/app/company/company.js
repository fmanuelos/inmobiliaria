'use strict';

angular.module('inmobiliariaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('company', {
        url: '/company/new',
        templateUrl: 'app/company/company.html',
        css: 'app/account/login/login.body.css',
        controller: 'CompanyCtrl',
        authenticate: true
      });
  });
