'use strict';

angular.module('inmobiliariaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('user', {
        url: '/users',
        templateUrl: 'app/user/user.html',
        controller: 'UserCtrl',
        authenticate: true
      });
  });
