'use strict';

angular.module('inmobiliariaApp')
  .controller('AsideCtrl', function ($scope, $location, $rootScope, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };

    $scope.employee = true;
    $scope.customer = true;

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

  });
