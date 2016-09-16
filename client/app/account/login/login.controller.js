'use strict';

angular.module('inmobiliariaApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $cookieStore) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home

          $cookieStore.remove('Company');
          $cookieStore.remove('Building');

          $location.path('/main');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

  });
